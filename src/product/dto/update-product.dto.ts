import { PartialType } from '@nestjs/mapped-types';
import { CriaProdutoDTO } from './create-product.dto';

export class AtualizaProdutoDTO extends PartialType(CriaProdutoDTO) { }
