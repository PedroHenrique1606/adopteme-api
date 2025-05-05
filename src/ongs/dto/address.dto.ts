// src/modules/ong/dtos/address.dto.ts
import { IsNotEmpty, IsOptional } from 'class-validator';

export class AddressDto {
  @IsNotEmpty()
  cep: string;

  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  number: string;

  @IsOptional()
  complement?: string;

  @IsNotEmpty()
  neighborhood: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;
}
