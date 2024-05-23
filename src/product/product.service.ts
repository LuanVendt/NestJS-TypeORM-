import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CriaProdutoDTO } from "./dto/create-product.dto";
import { AtualizaProdutoDTO } from "./dto/update-product.dto";
import { ProdutoEntity } from "./product.entity";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProdutoEntity)
        private readonly productRepository: Repository<ProdutoEntity>
    ) { }

    async createProduct(productData: CriaProdutoDTO) {
        const produtoEntity = new ProdutoEntity()

        Object.assign(produtoEntity, productData as ProdutoEntity);

        await this.productRepository.save(productData);

        return {
            message: "Product created successfully"
        }
    }

    async getAllProducts() {
        const products = await this.productRepository.find();

        return {
            message: "List of products",
            products
        }
    }

    async getProductById(id: string) {
        const product = await this.productRepository.findOneBy({ id })

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        return product
    }

    async updateProduct(id: string, productData: AtualizaProdutoDTO) {
        try {
            const product = await this.productRepository.findOneBy({ id })

            if (!product) {
                throw new NotFoundException('Product not found');
            }

            Object.assign(product, productData as ProdutoEntity);

            await this.productRepository.update(id, productData);

            return {
                message: "Product updated successfully"
            }
        } catch {
            throw new NotFoundException('Product not found');
        }
    }

    async deleteProduct(id: string) {
        try {
            await this.productRepository.softDelete(id);

            return {
                message: "Product deleted successfully"
            }
        } catch {
            throw new NotFoundException('Product not found');
        }
    }
}