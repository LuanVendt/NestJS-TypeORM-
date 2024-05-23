import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseInterceptors,
} from '@nestjs/common';

import { CacheInterceptor } from '@nestjs/cache-manager';
import { CriaProdutoDTO } from './dto/create-product.dto';
import { AtualizaProdutoDTO } from './dto/update-product.dto';
import { ProdutoRepository } from './product.repository';
import { ProductService } from './product.service';

@Controller('products')
export class ProdutoController {
    constructor(
        private readonly produtoRepository: ProdutoRepository,
        private readonly productService: ProductService,
    ) { }

    @Post()
    async criaNovo(@Body() dadosProduto: CriaProdutoDTO) {
        return await this.productService.createProduct(dadosProduto)
    }

    @Get()
    @UseInterceptors(CacheInterceptor)
    async listaTodos() {
        return this.productService.getAllProducts();
    }

    @Get('/:id')
    @UseInterceptors(CacheInterceptor)
    async getProductById(@Param('id') id: string) {
        return await this.productService.getProductById(id);
    }

    @Put('/:id')
    async atualiza(@Param('id') id: string, @Body() dadosProduto: AtualizaProdutoDTO) {
        return await this.productService.updateProduct(id, dadosProduto);
    }

    @Delete('/:id')
    async remove(@Param('id') id: string) {
        return await this.productService.deleteProduct(id);
    }
}
