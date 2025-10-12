import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  email: string;

  @IsEnum(['ADMIN', 'ENGINEER', 'INTERN'])
  role: 'ADMIN' | 'ENGINEER' | 'INTERN';
}
