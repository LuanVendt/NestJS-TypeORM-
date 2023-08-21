import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UserRepository } from '../user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({
  async: true,
})
export class EmailIsUnicValidator implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const userExist = await this.userRepository.existWhithMail(value);
    return !userExist;
  }
}

export const EmailIsUnic = (opcoesDeValidacao: ValidationOptions) => {
  return (object: object, propriedade: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: EmailIsUnicValidator,
    });
  };
};
