import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import CriaUsuarioDTO from './dto/criaUsuario.dto';
import UpdateUserDTO from './dto/UpdateUser.dto';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(
    private userService: UserService,
  ) { }

  @Post()
  async createUser(@Body() userData: CriaUsuarioDTO) {
    return this.userService.createUser(userData);
  }

  @Get()
  async listUsers() {
    return await this.userService.getUsers();
  }

  @Put('/:id')
  async updateuser(@Param('id') id: string, @Body() newData: UpdateUserDTO) {
    return this.userService.updateUser(id, newData)
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
