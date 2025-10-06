import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import type { TUser } from './data/types.js';
import { DCreateUser } from './dto/create-user.dto.js';
import { DUpdateUser } from './dto/update-user.dto.js';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  findAll(@Query('role') role?: 'ADMIN' | 'ENGINEER' | 'INTERN') {
    return this.userService.findAll(role);
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }
  @Post()
  create(@Body(ValidationPipe) user: DCreateUser) {
    return this.userService.create(user);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updatedUser: DUpdateUser,
  ) {
    return this.userService.update(id, updatedUser);
  }
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
