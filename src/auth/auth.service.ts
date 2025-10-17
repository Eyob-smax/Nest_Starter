import {
  BadRequestException,
  Body,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  async register(@Body() registerData: Prisma.usersCreateInput) {
    try {
      const { username, password, email } = registerData;
      if (!username || !password || !email) {
        throw new BadRequestException('Incomplete credentials');
      }
      const user = await this.databaseService.users.create({
        data: {
          email: registerData.email,
          password: await bcrypt.hash(password, 10),
          username: registerData.username,
        },
      });
      if (!user) {
        throw new HttpException("Can't perform on the database!", 500);
      }
      return 'User created successfully';
    } catch (err) {
      throw new InternalServerErrorException(
        'Something went wrong ' + err.message,
      );
    }
  }

  async login(@Body() loginData: Partial<Prisma.usersCreateInput>) {
    const { password, email } = loginData;
    if (!password || !email) {
      throw new BadRequestException('Email or password missing');
    }
    const user = await this.databaseService.users.findUnique({
      where: { email },
    });
    if (!user?.email) {
      throw new NotFoundException('User not found');
    }
    const token = jwt.sign(
      { email, isAdmin: email === 'eyobsmax@gmail.com' ? true : false },
      process.env.JWT_SECRET,
      {
        expiresIn: 60 * 1000,
      },
    );

    return {
      message: 'Logged in successfully!',
      data: { token },
    };
  }
}
