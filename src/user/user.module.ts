import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { EmailIsUnicValidator } from './validacao/email-eh-unico.validator';

@Module({
  controllers: [UserController],
  providers: [UserRepository, EmailIsUnicValidator],
})
export class UserModule {}
