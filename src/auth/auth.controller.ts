import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { Prisma } from '@prisma/client';
import type { Response, Request } from 'express';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/register')
  async register(@Body() registerData: Prisma.usersCreateInput) {
    const result = await this.authService.register(registerData);
    return result;
  }
  @Post('/login')
  async login(
    @Body() loginData: Partial<Prisma.usersCreateInput>,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(loginData);
    if (result?.data?.token) {
      res.cookie('token', result.data.token, {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60,
      });
      return { message: 'User logged in successfully!' };
    }
    return result;
  }

  @Get('/logout')
  logout(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    if (!req.cookies?.token) {
      throw new NotFoundException('User Already logged out');
    }
    res.clearCookie('token');
    return { message: 'User logged out successfully!' };
  }
}
