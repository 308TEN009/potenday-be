import { User } from '@database';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, Length, ValidateNested } from 'class-validator';
import { CreateSocialAccountDto } from './create-social-account.dto';

export class CreateUserDto extends PickType(User, [
  'email',
  'userId',
  'phoneNumber',
] as const) {
  @ApiProperty({
    description: '로그인시 입력하는 유저 PW',
    type: String,
    example: 'testtest',
  })
  @IsString()
  @Length(3, 255)
  readonly password!: string;

  @Type(() => CreateSocialAccountDto)
  @ValidateNested({ each: true })
  readonly socialAccount?: CreateSocialAccountDto;

  constructor(data: CreateUserDto) {
    super();
    Object.assign(this, data);
  }
}
