import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const checkEmailUser = await this.authService.findUserByEmail(
      registerDto.email,
    );

    if (checkEmailUser) {
      throw new UnprocessableEntityException('Email already exists');
    }

    return this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.findUserToLoginByEmail(loginDto.email);
    if (!user) throw new NotFoundException('User not found');

    if (!user.comparePassword(loginDto.password))
      throw new UnauthorizedException('Invalid password');

    return user;
  }
}
