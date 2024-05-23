import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Req,
    UseGuards
} from '@nestjs/common';
import { AutenticacaoGuard, RequisicaoComUsuario } from 'src/autenticacao/autenticacao/autenticacao.guard';
import { AtualizaPedidoDto } from './dto/AtualizaPedido.dto';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { PedidoService } from './pedido.service';

@Controller('pedidos')
@UseGuards(AutenticacaoGuard)
export class PedidoController {
    constructor(private readonly pedidoService: PedidoService) { }

    @Post()
    async criaPedido(
        @Req() req: RequisicaoComUsuario,
        @Body() dadosDoPedido: CriaPedidoDTO,
    ) {
        const usuarioId = req.usuario.sub;

        const pedidoCriado = await this.pedidoService.cadastraPedido(
            usuarioId,
            dadosDoPedido,
        )
        return pedidoCriado
    }

    @Get()
    async obtemPedidosDeUsuario(@Req() req: RequisicaoComUsuario) {
        const pedidos = await this.pedidoService.obtemPedidosDeUsuario(req.usuario.sub);


        return pedidos;
    }

    @Patch(':id')
    atualizaPedido(
        @Req() req: RequisicaoComUsuario,
        @Param('id') pedidoId: string,
        @Body() dadosDeAtualizacao: AtualizaPedidoDto,
    ) {
        const usuarioId = req.usuario.sub;

        return this.pedidoService.atualizaPedido(pedidoId, dadosDeAtualizacao, usuarioId);
    }
}