import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Request,
  Res,
  UnauthorizedException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const checkEmailUser = await this.authService.findUserByEmail(
      registerDto.email,
    );

    if (checkEmailUser) {
      throw new UnprocessableEntityException('Email already exists');
    }

    await this.authService.register(registerDto);

    return {
      message: 'User created successfully',
      statusCode: 201,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const user = await this.authService.findUserToLoginByEmail(loginDto.email);
    if (!user) throw new NotFoundException('User not found');

    if (!user.comparePassword(loginDto.password))
      throw new UnauthorizedException('Invalid password');

    const payload = { sub: user.id, username: user.name };
    const access_token = await this.jwtService.signAsync(payload);
    res
      .cookie('access_token', access_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
      })
      .status(200);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(
    @Request()
    req: {
      user: {
        sub: string;
        username: string;
      };
    },
  ) {
    return this.authService.findUserById(req.user.sub);
  }
}
