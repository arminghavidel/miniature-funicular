import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUsersDto } from './dto/create-users.dto';
import { IdUserResponse } from './interfaces/getByIdResponse.interface';
import { UserDocument } from '../../db/models/users.entity';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  createUser(createUsersDto: CreateUsersDto): Promise<UserDocument> {
    return this.usersRepository.createUser(createUsersDto);
  }

  getUserById(id: string): Promise<IdUserResponse> {
    return this.usersRepository.getUserById(id);
  }

  getUserAvatar(id: string): Promise<string> {
    // If the repository method is refactored to return only a string.
    return this.usersRepository.getUserAvatar(id);
  }

  deleteAvatar(id: string): Promise<string> {
    return this.usersRepository.deleteAvatar(id);
  }
}
