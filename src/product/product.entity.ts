import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CaracteristicaProduto } from './product-feature.entity';
import { ImagemProduto } from './product-image.entity';


@Entity({ name: 'products' })
export class ProdutoEntity {

  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'user_id', length: 100, nullable: false })
  usuarioId: string;

  @Column({ name: 'name', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'value', nullable: false })
  valor: number;

  @Column({ name: 'quantity', nullable: false })
  quantidade: number;

  @Column({ name: 'description', length: 255, nullable: false })
  descricao: string;

  @Column({ name: 'category', length: 100, nullable: false })
  categoria: string;

  @OneToMany(() => CaracteristicaProduto, caracteristicaProduto =>
    caracteristicaProduto.produto, { cascade: true, eager: true })
  caracteristicas: CaracteristicaProduto[];

  @OneToMany(() => ImagemProduto, imagemProduto =>
    imagemProduto.produto, { cascade: true, eager: true })
  imagens: ImagemProduto[];


  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
