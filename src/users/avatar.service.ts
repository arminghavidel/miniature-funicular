import { Injectable } from '@nestjs/common';
import { User } from 'db/models/users.entity';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

@Injectable()
export class AvatarService {
  private avatarDirectory = path.join(__dirname, '..', 'avatars');

  async getUserAvatar(userId: string): Promise<string> {
    const user = await User.findOne({ where: { id: userId } });
    if (user && user.avatar) {
      return user.avatar;
    } else {
      const avatarUrl = `https://reqres.in/api/users/${userId}`; // Replace with actual URL
      const response = await axios.get(avatarUrl, {
        responseType: 'arraybuffer',
      });
      const buffer = Buffer.from(response.data, 'binary').toString('base64');
      const filename = path.join(this.avatarDirectory, `${userId}avatar.png`);

      fs.mkdirSync(this.avatarDirectory, { recursive: true });

      fs.writeFileSync(filename, buffer, 'base64');

      return filename;
    }
  }

  async deleteUserAvatar(userId: string): Promise<void> {
    const user = await User.findOne({ where: { id: userId } });
    if (user && user.avatar) {
      const avatarPath = path.join(this.avatarDirectory, `${userId}avatar.png`);
      fs.unlinkSync(avatarPath);
      user.avatar = undefined;
      await user.save();
    }
  }
}
