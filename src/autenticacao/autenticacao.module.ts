import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AutenticacaoController } from './autenticacao.controller';
import { AutenticacaoService } from './autenticacao.service';

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => {
                return {
                    secret: configService.get<string>('SEGREDO_JWT'),
                    signOptions: {
                        expiresIn: '1h'
                    }
                }
            },
            inject: [ConfigService],
            global: true,
        })
    ],
    controllers: [AutenticacaoController],
    providers: [AutenticacaoService]
})
export class AutenticacaoModule { }
