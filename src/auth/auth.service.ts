import { Body, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service.js';
import { PartialType } from '@nestjs/mapped-types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import type { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  async register(@Body() registerData: Prisma.usersCreateInput) {
    try {
      const { username, password, email } = registerData;
      console.log(username, email, password);
      if (!username || !password || !email) {
        return { success: false, Message: 'Incomplete credentials' };
      }
      const user = await this.databaseService.users.create({
        data: {
          email: registerData.email,
          password: await bcrypt.hash(password, 10),
          username: registerData.username,
        },
      });
      if (!user) {
        throw new Error("Can't perform onthe database!");
      }
      return { success: true, message: 'User created successfully' };
    } catch (err) {
      return {
        success: false,
        message: `Something went wrong: ${err.message}`,
      };
    }
  }

  async login(
    @Body() loginData: Partial<Prisma.usersCreateInput>,
    res: Response,
  ) {
    const { password, email } = loginData;
    if (!password || !email) {
      return { success: false, message: 'Password or email required!' };
    }
    const user = this.databaseService.users.findUnique({
      where: { email },
    });
    if (!user) ({ success: false, message: 'User not found!' });
    const token = jwt.sign({ email }, process.env.JWT_SECRET);

    return {
      success: true,
      message: 'Logged in successfully!',
      data: { token },
    };
  }
}
