import { User } from '@database';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserInjector } from './common';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { UserService } from './interfaces';

@Controller('user')
@ApiTags('User API')
export class UserController {
  constructor(
    @Inject(UserInjector.USER_SERVICE)
    private readonly userService: UserService,
  ) {}

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationPipe()) dto: UpdateUserDto,
  ) {
    return this.userService.update(id, dto);
  }

  @Get('list')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
