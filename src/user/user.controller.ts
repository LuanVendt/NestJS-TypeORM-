import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Controller('/users')
export class UserController {
  private userRepository = new UserRepository();

  @Post()
  async createUser(@Body() userdata) {
    this.userRepository.save(userdata);
    return userdata;
  }

  @Get()
  async listUsers() {
    return this.userRepository.list();
  }
}
