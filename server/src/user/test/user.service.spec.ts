import { SocialAccount, User } from '@database';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserService } from '../service/user.service';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;
  let socialAccountRepository: Repository<SocialAccount>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(SocialAccount),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    socialAccountRepository = module.get<Repository<SocialAccount>>(
      getRepositoryToken(SocialAccount),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(socialAccountRepository).toBeDefined();
  });

  describe('create', () => {
    const createUserDto = new CreateUserDto({
      userId: 'qjqdn156822',
      email: 'qjqdn1568@naver.com',
      phoneNumber: '+82-10-3252-2568',
      password: 'testtest',
      socialAccount: {
        socialId: 'axa23662dszxasgda64234',
        type: 'kakao',
        accessToken: 'c3da4c30-1b30-45cc-9cbc-967721ad52dc',
        refreshToken: 'c3da4c30-1b30-45cc-9cbc-967721ad52dc',
      },
    });

    const user = plainToInstance(User, {
      _id: 'test user id',
    });
    const socialAccount = plainToInstance(SocialAccount, {
      _id: 'test social account id',
    });

    it('should save User Entity and related Entities', async () => {
      const createUserEntity = jest
        .spyOn(userRepository, 'create')
        .mockReturnValue(user);
      const createSocialAccountEntity = jest
        .spyOn(socialAccountRepository, 'create')
        .mockReturnValue(socialAccount);
      const save = jest.spyOn(userRepository, 'save').mockResolvedValue({
        ...user,
        _id: 'test id',
      });

      await service.create(createUserDto);

      expect(createUserEntity).toBeCalledTimes(1);
      expect(createUserEntity).toBeCalledWith({
        ...createUserDto,
        socialAccountList: [socialAccount],
      });

      expect(createSocialAccountEntity).toBeCalledTimes(1);
      expect(createSocialAccountEntity).toBeCalledWith(
        createUserDto.socialAccount,
      );

      expect(save).toBeCalledTimes(1);
      expect(save).toBeCalledWith(user);
    });
  });
});
