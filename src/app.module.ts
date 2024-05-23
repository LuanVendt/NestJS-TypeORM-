import { CacheModule } from '@nestjs/cache-manager';
import { ClassSerializerInterceptor, ConsoleLogger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { redisStore } from 'cache-manager-redis-yet';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { PostgresConfigService } from './config/postgres.config.service';
import { FiltroDeExcecaoGlobal } from './filtros/filtro-de-excecao-global';
import { LoggerGlobalInterceptor } from './interceptores/logger-global.interceptor';
import { PedidoModule } from './pedido/pedido.module';
import { ProdutoModule } from './product/product.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        UserModule,
        ProdutoModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            useClass: PostgresConfigService,
            inject: [PostgresConfigService],
        }),
        PedidoModule,
        CacheModule.registerAsync({
            useFactory: async () => ({
                store: await redisStore({ ttl: 10 * 1000, socket: { host: 'localhost', port: 6379 } })
            }),
            isGlobal: true,
        }),
        AutenticacaoModule,
    ],
    providers: [
        { provide: APP_FILTER, useClass: FiltroDeExcecaoGlobal },
        { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
        { provide: APP_INTERCEPTOR, useClass: LoggerGlobalInterceptor },
        ConsoleLogger,
    ],
})
export class AppModule { }
