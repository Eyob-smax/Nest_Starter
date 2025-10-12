import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto.js';

export class updateEmployeeDto extends PartialType(CreateEmployeeDto) {}
