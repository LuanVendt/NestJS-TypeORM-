import { PartialType } from '@nestjs/mapped-types';
import CriaUsuarioDTO from './criaUsuario.dto';

export default class UpdateUserDTO extends PartialType(CriaUsuarioDTO) { }
