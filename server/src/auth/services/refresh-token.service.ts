import { RefreshToken } from '@database';
import { Injectable } from '@nestjs/common';
import { addDays } from 'date-fns';
import { MoreThan, Repository } from 'typeorm';
import {
  InjectTransactionRepository,
  Transactional,
} from 'typeorm-aop-transaction';
import { TokenMetadata } from '../common';
import { FindUserRefreshTokenDto } from '../dtos';
import { RefreshTokenService as IsRefreshTokenService } from '../interfaces';

@Injectable()
export class RefreshTokenService implements IsRefreshTokenService {
  constructor(
    @InjectTransactionRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  @Transactional()
  async sign(userId: string): Promise<string> {
    const refreshToken = await this.refreshTokenRepository.save(
      this.refreshTokenRepository.create({
        userId,
        expiredIn: this.getExpiredIn(),
      }),
    );

    return refreshToken._id;
  }

  @Transactional()
  async refresh(dto: FindUserRefreshTokenDto): Promise<string> {
    const { userId, refreshToken: oldRefreshToken } = dto;

    // 새로운 리프레시 토큰 발급
    const newRefreshToken = await this.sign(userId);

    // 기존 리프레시 토큰 삭제
    await this.refreshTokenRepository.softDelete(oldRefreshToken);

    return newRefreshToken;
  }

  @Transactional()
  findOneActiveRefreshToken(dto: FindUserRefreshTokenDto) {
    const { userId, refreshToken: oldRefreshToken } = dto;

    return this.refreshTokenRepository.findOne({
      where: {
        _id: oldRefreshToken,
        userId,
        expiredIn: MoreThan(new Date()),
      },
    });
  }

  @Transactional()
  async deleteAllToken(userId: string) {
    // 특정 유저의 모든 리프레시 토큰 삭제
    await this.refreshTokenRepository.softDelete({
      userId,
    });
  }

  private getExpiredIn(): Date {
    const now = new Date(Date.now());
    const expiredIn = addDays(now, TokenMetadata.REFRESH_TOKEN_EXPIRED_DAYS);
    return expiredIn;
  }
}
