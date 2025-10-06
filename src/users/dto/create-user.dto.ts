import { IsEmail, IsString, IsEnum, IsNotEmpty } from 'class-validator';

export enum UserRole {
  INTERN = 'INTERN',
  ENGINEER = 'ENGINEER',
  ADMIN = 'ADMIN',
}

export class DCreateUser {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(UserRole, {
    message: 'Valid role required',
  })
  role: UserRole;
}
