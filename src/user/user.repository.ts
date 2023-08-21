import { Injectable } from '@nestjs/common/decorators';

@Injectable()
export class UserRepository {
  private users = [];

  async save(user) {
    this.users.push(user);
  }

  async list() {
    return this.users;
  }

  async existWhithMail(email: string) {
    const possibleUser = this.users.find(user => user.email === email);
    return possibleUser != undefined;
  }
}
