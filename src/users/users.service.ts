import { Injectable, NotFoundException } from '@nestjs/common';
import { users } from './data/users.js';
import type { TUser } from './data/types.js';
import { DCreateUser } from './dto/create-user.dto.js';
import { DUpdateUser } from './dto/update-user.dto.js';

@Injectable()
export class UsersService {
  private users: TUser[] = users;

  findAll(role?: 'ADMIN' | 'ENGINEER' | 'INTERN') {
    if (role) {
      const found = this.users.find((user) => user.role === role);
      if (!found) {
        throw new NotFoundException('User with the given role not found!');
      }
      return this.users.filter((user) => user.role === role);
    }

    return this.users;
  }

  findOne(id: number) {
    const found = this.users.find((user) => user.id === id);
    if (!found) {
      throw new NotFoundException('User not found');
    }
    return found;
  }

  create(user: DCreateUser) {
    const highestID = Math.max(...this.users.map((user) => user.id));
    const newUser = {
      id: highestID + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUser: DUpdateUser) {
    this.users = this.users.map((user) =>
      user.id === id ? { ...user, ...updatedUser } : user,
    );

    return this.users.find((user) => user.id === id);
  }

  delete(id: number) {
    const removedUser = this.users.find((user) => user.id === id);
    if (!removedUser) {
      throw new NotFoundException('There is now user with the provided ID');
    }

    this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
