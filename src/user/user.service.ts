import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import CriaUsuarioDTO from "./dto/criaUsuario.dto";
import { ListaUsuarioDTO } from "./dto/ListUser.dto";
import UpdateUserDTO from "./dto/UpdateUser.dto";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async createUser(userData: CriaUsuarioDTO) {
        const usuarioEntity = new UserEntity()

        Object.assign(usuarioEntity, userData as UserEntity);

        const user = await this.userRepository.save({
            name: userData.name,
            email: userData.email,
            password: userData.password
        })

        return {
            message: 'User created successfully',
        }
    }

    async getUsers() {
        const savedUsers = await this.userRepository.find();
        const usersList = savedUsers.map(
            (user) => new ListaUsuarioDTO(user.id, user.name)
        )

        return {
            message: 'List of users',
            users: usersList
        };
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOneBy({ email })

        return user
    }

    async updateUser(id: string, userData: UpdateUserDTO) {
        const usuarioEntity = new UserEntity()

        try {
            const user = await this.userRepository.findOneBy({ id })

            if (!user) {
                throw new NotFoundException('User not found');
            }

            Object.assign(usuarioEntity, userData as UserEntity);

            const updatedUser = await this.userRepository.update(id, {
                name: userData.name,
                email: userData.email,
                password: userData.password
            });

            return {
                message: 'User updated successfully',
            }
        } catch {
            throw new NotFoundException('User not found');
        }
    }

    async deleteUser(id: string) {
        try {
            const user = await this.userRepository.findOneBy({ id })

            if (!user) {
                throw new NotFoundException('User not found');
            }

            const userDeleted = await this.userRepository.softDelete({
                id,
            });

            return {
                message: 'User deleted successfully',
            }
        } catch (error) {
            throw new NotFoundException('User not found');
        }
    }
}
