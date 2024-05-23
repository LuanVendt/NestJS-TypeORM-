import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';


export interface UsuarioPayload {
    sub: string;
    nome: string;
}


@Injectable()
export class AutenticacaoService {
    constructor(
        private readonly usuarioService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async login(email: string, senha: string) {
        const usuario = await this.usuarioService.getUserByEmail(email);

        if (!usuario) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const usuarioFoiAutenticado = await bcrypt.compare(senha, usuario.password);

        if (!usuarioFoiAutenticado) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const payload: UsuarioPayload = {
            sub: usuario.id, // subject = sujeito
            nome: usuario.name
        }

        return {
            token_acesso: await this.jwtService.signAsync(payload)
        }
    }
}
