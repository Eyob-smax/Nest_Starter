import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service.js';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createEmployeeDto: Prisma.employeeCreateInput) {
    try {
      if (!createEmployeeDto.name || !createEmployeeDto.role) {
        throw new BadRequestException('Name and role are required.');
      }

      const employee = await this.databaseService.employee.create({
        data: createEmployeeDto,
      });

      return employee;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      if (error.code === 'P2002') {
        throw new BadRequestException(
          `Unique constraint compromised for ${error.meta.target[0]} field`,
        );
      }

      throw new InternalServerErrorException(
        'Failed to create employee.' + error.message,
      );
    }
  }

  async findAll(role?: 'ADMIN' | 'ENGINEER' | 'INTERN') {
    try {
      const employees = await this.databaseService.employee.findMany({
        where: role ? { role } : {},
      });

      if (!employees.length) {
        throw new NotFoundException(
          role
            ? `No employees found with role '${role}'.`
            : 'No employees found.',
        );
      }

      return employees;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to fetch employees.');
    }
  }

  async findOne(id: number) {
    try {
      if (!id || isNaN(id))
        throw new BadRequestException('Invalid employee ID.');

      const employee = await this.databaseService.employee.findUnique({
        where: { id },
      });

      if (!employee) {
        throw new NotFoundException(`Employee with ID ${id} not found.`);
      }

      return employee;
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      )
        throw error;
      throw new InternalServerErrorException('Failed to fetch employee.');
    }
  }

  async update(id: number, updateEmployeeDto: Prisma.employeeUpdateInput) {
    try {
      if (!id || isNaN(id))
        throw new BadRequestException('Invalid employee ID.');

      const existingEmployee = await this.databaseService.employee.findUnique({
        where: { id },
      });

      if (!existingEmployee) {
        throw new NotFoundException(`Employee with ID ${id} not found.`);
      }

      const updatedEmployee = await this.databaseService.employee.update({
        where: { id },
        data: updateEmployeeDto,
      });

      return updatedEmployee;
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      )
        throw error;
      throw new InternalServerErrorException('Failed to update employee.');
    }
  }

  async delete(id: number) {
    try {
      if (!id || isNaN(id))
        throw new BadRequestException('Invalid employee ID.');

      const existingEmployee = await this.databaseService.employee.findUnique({
        where: { id },
      });

      if (!existingEmployee) {
        throw new NotFoundException(`Employee with ID ${id} not found.`);
      }

      await this.databaseService.employee.delete({
        where: { id },
      });

      return { message: `Employee with ID ${id} deleted successfully.` };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      )
        throw error;
      throw new InternalServerErrorException('Failed to delete employee.');
    }
  }
}
