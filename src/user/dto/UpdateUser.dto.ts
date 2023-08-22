import { IsEmail, MinLength, IsNotEmpty, IsOptional } from 'class-validator';
import { EmailIsUnic } from '../validacao/email-eh-unico.validator';

export default class UpdateUserDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
  @IsOptional()
  name: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido!' })
  @EmailIsUnic({ message: 'E-mail já cadastrado!' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
  @IsOptional()
  password: string;
}
