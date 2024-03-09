import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  async findUserByEmail(email: string) {
    return {
      email,
    };
  }
}
