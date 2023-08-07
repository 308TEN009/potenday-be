import { InternalServerErrorException } from '@nestjs/common';
import { NestEnvType, NEST_ENV } from './types';

export class NestEnvUtil {
  /**
   * Get ENV dir path
   */
  static getEnvFilePath = () => {
    const nodeEnv: NestEnvType = NestEnvUtil.getNodeEnv();

    return `envs/.env.${nodeEnv}`;
  };

  /**
   * Get NODE_ENV variable
   */
  static getNodeEnv = (): NestEnvType => {
    const nodeEnv: string | undefined = process.env.NODE_ENV;

    if (NestEnvUtil.isNestEnv(nodeEnv)) {
      return nodeEnv as any;
    } else {
      throw new InternalServerErrorException(`NODE_ENV(${nodeEnv})`);
    }
  };

  /**
   * (TypeGuard) Server Environment Variable
   * @param envString (Optional) target string
   */
  static isNestEnv = (envString?: string): envString is NestEnvType => {
    if (envString && Object.values(NEST_ENV).includes(envString as never)) {
      return true;
    }
    return false;
  };
}
