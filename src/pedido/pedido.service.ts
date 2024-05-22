import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProdutoEntity } from '../product/product.entity';
import { UserEntity } from '../user/user.entity';
import { AtualizaPedidoDto } from './dto/AtualizaPedido.dto';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { StatusPedido } from './enum/status-pedido.enum';
import { ItemPedidoEntity } from './item-pedido.entity';
import { PedidoEntity } from './pedido.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UserEntity)
    private readonly usuarioRepository: Repository<UserEntity>,
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) { }

  private async buscaUsuario(id: string) {
    const usuario = await this.usuarioRepository.findOneBy({ id })

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado')
    }

    return usuario
  }

  private async trataDadosDoPedido(dadosDoPedido: CriaPedidoDTO, produtosRelacionados: ProdutoEntity[]) {
    dadosDoPedido.itensPedido.forEach((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find((produto) => produto.id === itemPedido.produtoId)

      if (!produtoRelacionado) {
        throw new NotFoundException(`Produto com id ${itemPedido.produtoId} não encontrado`)
      }

      if (produtoRelacionado.quantidade < itemPedido.quantidade) {
        throw new BadRequestException(`A quantidade solicitada (${itemPedido.quantidade}) do produto '${produtoRelacionado.nome}' é maior do que a quantidade disponível (${produtoRelacionado.quantidade})`)
      }
    })
  }

  async cadastraPedido(usuarioId: string, dadosDoPedido: CriaPedidoDTO) {
    const usuario = await this.buscaUsuario(usuarioId)

    const produtosIds = dadosDoPedido.itensPedido.map((itemPedido) => itemPedido.produtoId)

    const produtosRelacionados = await this.produtoRepository.findBy({ id: In(produtosIds) })

    const pedidoEntity = new PedidoEntity();

    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO
    pedidoEntity.usuario = usuario

    await this.trataDadosDoPedido(dadosDoPedido, produtosRelacionados)

    const itensPedidoEntidades = dadosDoPedido.itensPedido.map((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find((produto) => produto.id === itemPedido.produtoId)

      const itemPedidoEntity = new ItemPedidoEntity();

      itemPedidoEntity.produto = produtoRelacionado!

      itemPedidoEntity.preco_venda = produtoRelacionado!.valor

      itemPedidoEntity.quantidade = itemPedido.quantidade;

      itemPedidoEntity.produto.quantidade -= itemPedido.quantidade

      return itemPedidoEntity
    })

    const valorTotal = itensPedidoEntidades.reduce((total, item) => {
      return total + item.preco_venda * item.quantidade
    }, 0);

    pedidoEntity.itensPedido = itensPedidoEntidades

    pedidoEntity.valorTotal = valorTotal

    const pedidoCriado = await this.pedidoRepository.save(pedidoEntity)
    return pedidoCriado
  }

  async obtemPedidosDeUsuario(usuarioId: string) {
    return this.pedidoRepository.find({
      where: {
        usuario: { id: usuarioId },
      },
      relations: {
        usuario: true,
      },
    });
  }

  async atualizaPedido(id: string, dto: AtualizaPedidoDto) {
    const pedido = await this.pedidoRepository.findOneBy({ id });

    if (!pedido) {
      throw new NotFoundException('Pedido não encontrado');
    }

    Object.assign(pedido, dto as PedidoEntity);

    return this.pedidoRepository.save(pedido);
  }
}