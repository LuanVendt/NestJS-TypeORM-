import { CallHandler, ConsoleLogger, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';
import { RequisicaoComUsuario } from 'src/autenticacao/autenticacao/autenticacao.guard';

@Injectable()
export class LoggerGlobalInterceptor implements NestInterceptor {
    constructor(private logger: ConsoleLogger) { }

    intercept(contexto: ExecutionContext, next: CallHandler): Observable<any> {
        const contextoHttp = contexto.switchToHttp()
        const requisicao = contextoHttp.getRequest<Request | RequisicaoComUsuario>()

        const resposta = contextoHttp.getResponse<Response>()

        const { path, method } = requisicao
        const { statusCode } = resposta	
        
        this.logger.log(`Rota acessada: ${method} ${path}`)

        const instantePreControllador = Date.now()

        return next.handle().pipe(
            tap(() => {
                if ('usuario' in requisicao) {
                    this.logger.log(`Rota acessada pelo usuário ${requisicao.usuario.sub}`)
                }

                const tempoDeExecucaoDaRota = Date.now() - instantePreControllador
                this.logger.log(`Responsa: ${statusCode} - Tempo de execução: ${tempoDeExecucaoDaRota}ms`)
            })
        );
    }
}
