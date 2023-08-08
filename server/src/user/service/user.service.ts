import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import {
  InjectTransactionRepository,
  Transactional,
} from 'typeorm-aop-transaction';
import { SocialAccountService } from './social-account.service';
import { UserService as IsUserService } from '../interfaces';
import { User } from '@database';
import { UserInjector } from '../common';
import { CreateUserDto, UpdateUserDto } from '../dtos';

@Injectable()
export class UserService implements IsUserService {
  constructor(
    @Inject(UserInjector.SOCIAL_ACCOUNT_SERVICE)
    private readonly socialAccountService: SocialAccountService,
    @InjectTransactionRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Transactional()
  async create(dto: CreateUserDto) {
    const user = this.userRepository.create(dto);
    const savedUser = await this.userRepository.save(user);

    if (dto.socialAccount) {
      await this.socialAccountService.createSocialAccount(
        savedUser._id,
        dto.socialAccount,
      );
    }

    return savedUser;
  }

  @Transactional()
  async update(id: string, dto: UpdateUserDto) {
    const partialUser = this.userRepository.create(dto);
    const updateResult = await this.userRepository.update(id, partialUser);

    return updateResult;
  }

  @Transactional()
  async findAll(): Promise<User[]> {
    const result = await this.userRepository.find({
      relations: {
        socialAccountList: true,
        refreshTokenList: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    return result;
  }

  @Transactional()
  async findOne(_id: string): Promise<User> {
    const result = await this.userRepository.findOne({
      where: {
        _id,
      },
    });

    if (!result) {
      throw new NotFoundException('존재하지 않는 유저 조회');
    }

    return result;
  }

  @Transactional()
  async findDuplicateUser(email: string): Promise<User | null> {
    const result = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    return result;
  }

  @Transactional()
  async delete(id: string): Promise<DeleteResult> {
    const deleteResult = await this.userRepository.delete(id);

    return deleteResult;
  }
}
