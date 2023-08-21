import { IsEmail, MinLength, IsNotEmpty } from 'class-validator';
import { EmailIsUnic } from '../validacao/email-eh-unico.validator';

export default class CriaUsuarioDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
  name: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido!' })
  @EmailIsUnic({ message: 'E-mail já cadastrado!' })
  email: string;

  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
  password: string;
}
