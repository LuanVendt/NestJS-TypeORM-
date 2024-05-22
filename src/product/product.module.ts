import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoController } from './product.controller';
import { ProdutoEntity } from './product.entity';
import { ProdutoRepository } from './product.repository';
import { ProductService } from './product.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProdutoEntity])],
    controllers: [ProdutoController],
    providers: [ProdutoRepository, ProductService],
})
export class ProdutoModule { }
