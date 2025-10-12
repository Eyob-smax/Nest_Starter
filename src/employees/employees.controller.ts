import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { EmployeesService } from './employees.service.js';
import { Prisma } from '@prisma/client';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { MyLoggerService } from '../my-logger/my-logger.service.js';
import { CreateEmployeeDto } from './DTO/create-employee.dto.js';
import { updateEmployeeDto } from './DTO/update-employee.dto.js';

@SkipThrottle()
@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly logger: MyLoggerService,
  ) {}

  @Post()
  create(@Body(ValidationPipe) createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @SkipThrottle()
  @Get()
  findAll(@Query('role') role?: 'INTERN' | 'ADMIN' | 'ENGINEER') {
    return this.employeesService.findAll(role);
  }

  @Throttle({ short: { ttl: 60000, limit: 10 } })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.employeesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateEmployeeDto: updateEmployeeDto,
  ) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.employeesService.delete(id);
    return { message: `Employee with ID ${id} deleted successfully.` };
  }
}
