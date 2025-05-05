import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  Matches,
} from 'class-validator';
import { IsCnpjValid } from '../validators/is-cnpj-valid.validator';
import { AddressDto } from './address.dto';

export class CreateOngDto extends AddressDto {
  @IsNotEmpty()
  name: string;

  @IsCnpjValid()
  cnpj: string;

  @Matches(/^\+55\s?\d{2}\s?\d{4,5}-?\d{4}$/, { message: 'Telefone inválido' })
  phone: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MaxLength(500)
  description: string;
}