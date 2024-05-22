import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { FiltroDeExcecaoGlobal } from './filtros/filtro-de-excecao-global';
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
    PedidoModule
  ],
  providers: [
    { provide: APP_FILTER, useClass: FiltroDeExcecaoGlobal }
  ],
})
export class AppModule { }
