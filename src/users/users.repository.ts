import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { User, UserDocument } from 'db/models/users.entity';
import { IdUserResponse } from './interfaces/getByIdResponse.interface';
import { ExternalUsersService } from 'src/users/external-users.service';
import { AvatarService } from 'src/users/avatar.service';

@Injectable()
export class UsersRepository {
  constructor(
    private readonly externalUsersService: ExternalUsersService,
    private readonly avatarService: AvatarService,
  ) {}

  async createUser(createUsersDto: CreateUsersDto): Promise<UserDocument> {
    const { name } = createUsersDto;

    const found = await User.findOne({ name });
    if (found) {
      throw new Error('User already exists');
    }

    const user = new User(createUsersDto);
    await user.save();

    await this.externalUsersService.createUser(user);

    return user;
  }

  async getUserById(id: string): Promise<IdUserResponse> {
    try {
      return await this.externalUsersService.getUserById(id);
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async getUserAvatar(id: string): Promise<string> {
    try {
      return await this.avatarService.getUserAvatar(id);
    } catch (error) {
      throw new NotFoundException(`Avatar for user with ID ${id} not found`);
    }
  }

  async deleteAvatar(id: string): Promise<string> {
    const user = await User.findOne({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (user.avatar) {
      user.avatar = undefined;
      await user.save();
      await this.avatarService.deleteUserAvatar(id);
      return `${user.name}'s avatar removed.`;
    } else {
      return `${user.name} has no avatar.`;
    }
  }
}
