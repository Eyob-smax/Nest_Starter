import { PartialType } from '@nestjs/mapped-types';
import { DCreateUser } from './create-user.dto.js';

export class DUpdateUser extends PartialType(DCreateUser) {}
