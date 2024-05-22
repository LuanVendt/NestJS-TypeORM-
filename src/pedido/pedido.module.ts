import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoEntity } from 'src/product/product.entity';
import { UserEntity } from '../user/user.entity';
import { PedidoController } from './pedido.controller';
import { PedidoEntity } from './pedido.entity';
import { PedidoService } from './pedido.service';

@Module({
  imports: [TypeOrmModule.forFeature([PedidoEntity, UserEntity, ProdutoEntity])],
  controllers: [PedidoController],
  providers: [PedidoService]
})
export class PedidoModule { }
