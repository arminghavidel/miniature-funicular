import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';

@Controller('api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly rabbitMqService: RabbitmqService,
  ) {}

  @Post()
  async createUser(@Body() createUsersDto: CreateUsersDto) {
    try {
      await this.rabbitMqService.connectToRabbitMQ();
      return await this.usersService.createUser(createUsersDto);
    } catch (error) {
      // Handle or throw the error as needed
      throw new HttpException(
        'Failed to create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    try {
      return await this.usersService.getUserById(id);
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id/avatar')
  async getUserAvatar(@Param('id') id: string) {
    try {
      return await this.usersService.getUserAvatar(id);
    } catch (error) {
      throw new HttpException('Avatar not found', HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id/avatar')
  async deleteAvatar(@Param('id') id: string) {
    try {
      return await this.usersService.deleteAvatar(id);
    } catch (error) {
      throw new HttpException(
        'Failed to delete avatar',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
