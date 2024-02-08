import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { UserDocument } from 'db/models/users.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ExternalUsersService {
  constructor(private readonly httpService: HttpService) {}

  async createUser(user: UserDocument): Promise<void> {
    const response = await firstValueFrom(
      this.httpService.post('https://reqres.in/api/users', {
        name: user.name,
        job: user.job,
      }),
    );
  }

  async getUserById(id: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`https://reqres.in/api/users/${id}`),
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Error when trying to get user: ${error.message}`);
    }
  }
}
