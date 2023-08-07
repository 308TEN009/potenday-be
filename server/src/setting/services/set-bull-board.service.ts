import { INestApplication, Logger } from '@nestjs/common';
import { createBullBoard } from '@bull-board/api';
import { ExpressAdapter } from '@bull-board/express';
import { Queue } from 'bull';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ApplicationSetting } from '../interfaces/application-setting.interface';

/**
 * Bull-board library Setting
 */
export class SetBullBoardService implements ApplicationSetting {
  constructor(private readonly app: INestApplication) {}

  init() {
    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath('/bull-board'); // set up base path (bull board)

    const aQueue1 = this.app.get<Queue>(`BullQueue_Test`); // get queue from app

    createBullBoard({
      queues: [new BullAdapter(aQueue1)],
      serverAdapter,
    });

    this.app.use('/bull-board', serverAdapter.getRouter());

    Logger.log('Bull Board setting completed', 'init');
  }
}
