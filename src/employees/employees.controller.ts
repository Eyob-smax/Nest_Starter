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
  BadRequestException,
  MethodNotAllowedException,
  UsePipes,
} from '@nestjs/common';
import { EmployeesService } from './employees.service.js';
import { CreateEmployeeDto } from './DTO/create-employee.dto.js';
import { updateEmployeeDto } from './DTO/update-employee.dto.js';
import { ZodValidationPipe } from '../common/pipes/zodValidation.pipe.js';
import { createCatSchema } from '../common/pipes/zod.schema.js';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createCatSchema))
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  findAll(@Query('role') role?: 'INTERN' | 'ADMIN' | 'ENGINEER') {
    return this.employeesService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.employeesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ whitelist: true }))
    updateEmployeeDto: updateEmployeeDto,
  ) {
    if (Object.keys(updateEmployeeDto).length === 0) {
      throw new BadRequestException(
        'At least one field must be provided for update',
      );
    }
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.employeesService.delete(id);
    return { message: `Employee with ID ${id} deleted successfully.` };
  }
}
