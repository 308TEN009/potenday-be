import { Controller, Get, Version, VERSION_NEUTRAL } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  TypeOrmHealthIndicator,
  MemoryHealthIndicator,
  DiskHealthIndicator,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { RedisOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { IsRedisConfig } from '@config';

@Controller('health-check')
export class HealthCheckController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly db: TypeOrmHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly microService: MicroserviceHealthIndicator,
    private readonly configService: ConfigService<IsRedisConfig, true>,
  ) {}

  @Get()
  @Version(VERSION_NEUTRAL)
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('server', 'http://127.0.0.1'),
      () => this.db.pingCheck('database'),
      () => this.memory.checkHeap('memory_heap', 1500 * 1024 * 1024),
      () =>
        this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.5 }),
      () =>
        this.microService.pingCheck<RedisOptions>('redis', {
          transport: Transport.REDIS,
          options: {
            host: this.configService.get('redisHost'),
            port: this.configService.get('redisPort'),
            password: this.configService.get('redisPassword'),
          },
        }),
    ]);
  }
}
