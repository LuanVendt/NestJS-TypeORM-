import { Injectable } from '@nestjs/common/decorators';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async save(user: UserEntity) {
    this.users.push(user);
  }

  async list() {
    return this.users;
  }

  async existWhithMail(email: string) {
    const possibleUser = this.users.find((user) => user.email === email);
    return possibleUser != undefined;
  }

  private searchUserId(id: string) {
    const possibleUser = this.users.find((userSave) => userSave.id === id);

    if (!possibleUser) {
      throw new Error("user doesn't exist!");
    }

    return possibleUser;
  }

  async update(id: string, updateData: Partial<UserEntity>) {
    const user = this.searchUserId(id);

    Object.entries(updateData).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      user[key] = value;
    });

    return user;
  }

  async remove(id: string) {
    const user = this.searchUserId(id);
    this.users = this.users.filter((saveUser) => saveUser.id !== id);

    return user;
  }
}
