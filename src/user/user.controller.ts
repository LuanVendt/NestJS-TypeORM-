import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import CriaUsuarioDTO from './dto/criaUsuario.dto';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';
import { ListaUsuarioDTO } from './dto/ListUser.dto';
import UpdateUserDTO from './dto/UpdateUser.dto';

@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() userData: CriaUsuarioDTO) {
    const userEntity = new UserEntity();
    userEntity.email = userData.email;
    userEntity.password = userData.password;
    userEntity.name = userData.name;
    userEntity.id = uuid();

    this.userRepository.save(userEntity);
    return {
      user: new ListaUsuarioDTO(userEntity.id, userEntity.name),
      message: 'created user',
    };
  }

  @Get()
  async listUsers() {
    const usersSave = await this.userRepository.list();
    const usersList = usersSave.map(
      (user) => new ListaUsuarioDTO(user.id, user.name),
    );

    return usersList;
  }

  @Put('/:id')
  async updateuser(@Param('id') id: string, @Body() newData: UpdateUserDTO) {
    const updatedUser = await this.userRepository.update(id, newData);

    return {
      user: updatedUser,
      message: 'Updated user!',
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const userDeleted = await this.userRepository.remove(id);

    return {
      user: userDeleted,
      message: 'user deleted!',
    };
  }
}
