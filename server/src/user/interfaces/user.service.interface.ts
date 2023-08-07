import { User } from '@database';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dtos';

export interface UserService {
  /**
   * 유저 생성
   * @param dto 유저 생성 DTO
   * @returns `User` 생성된 유저 객체
   */
  create(dto: CreateUserDto): Promise<User>;

  /**
   * 유저 수정
   * @param id 수정할 유저 PK
   * @param dto 유저 수정 DTO
   * @returns `UpdateResult` 수정 결과
   */
  update(id: string, dto: UpdateUserDto): Promise<UpdateResult>;

  /**
   * 유저 전체 조회
   * @returns `User[]` 모든 유저 객체 배열
   */
  findAll(): Promise<User[]>;

  /**
   * 유저 단일 조회
   * @param id 유저 PK
   * @returns `User` 유저 객체
   *
   * @throws {NotFoundException} 해당 유저가 존재하지 않음
   */
  findOne(id: string): Promise<User>;

  /**
   * 중복 유저 조회
   * @param email 이메일 주소
   * @returns `User`  중복 유저가 존재
   * @returns `null`  중복 유저가 존재하지 않음
   */
  findDuplicateUser(email: string): Promise<User | null>;

  /**
   * 유저 삭제
   * @param id 유저 PK
   * @returns `DeleteResult` 삭제 결과
   */
  delete(id: string): Promise<DeleteResult>;
}
