import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { StatusPedido } from './enum/status-pedido.enum';
import { ItemPedidoEntity } from './item-pedido.entity';

@Entity({ name: 'pedidos' })
export class PedidoEntity {

    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ name: 'valor_total', nullable: false })
    valorTotal: number;

    @Column({ name: 'status', enum: StatusPedido, nullable: false })
    status: StatusPedido;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;

    @ManyToOne(() => UserEntity, (usuario) => usuario.pedidos)
    usuario: UserEntity;

    @OneToMany(() => ItemPedidoEntity, (itemPedido) => itemPedido.pedido, {
        cascade: true,
    })
    itensPedido: ItemPedidoEntity[];
}
