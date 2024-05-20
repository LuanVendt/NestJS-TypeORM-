import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProdutoEntity } from "./product.entity";

@Entity({ name: 'product_features' })
export class CaracteristicaProduto {

    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ name: 'name', length: 100, nullable: false })
    nome: string;

    @Column({ name: 'description', length: 255, nullable: false })
    descricao: string;

    @ManyToOne(() => ProdutoEntity, (produto) => produto.caracteristicas,
        { orphanedRowAction: 'delete', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    produto: ProdutoEntity;
}