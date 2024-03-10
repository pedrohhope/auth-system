import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  register(registerDto: RegisterDto) {
    return this.userRepository.insert(this.userRepository.create(registerDto));
  }

  findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  findUserToLoginByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'password'],
    });
  }

  findUserById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }
}
