import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProdutoEntity } from '../product/product.entity';
import { PedidoEntity } from './pedido.entity';

@Entity({ name: 'itens_pedidos' })
export class ItemPedidoEntity {

    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ name: 'quantidade', nullable: false })
    quantidade: number;

    @Column({ name: 'preco_venda', nullable: false })
    preco_venda: number;

    @ManyToOne(() => PedidoEntity, pedido => pedido.itensPedido, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    pedido: PedidoEntity;

    @ManyToOne(() => ProdutoEntity, produto => produto.itensPedido, {
        cascade: ['update', 'insert']
    })
    produto: ProdutoEntity
}
