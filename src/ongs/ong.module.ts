// src/modules/ong/ong.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OngEntity } from './entities/ong.entity';
import { IsCnpjValidConstraint } from './validators/is-cnpj-valid.validator';
import { OngController } from './ong.controller';
import { OngService } from './ong.service';

@Module({
  imports: [TypeOrmModule.forFeature([OngEntity])],
  controllers: [OngController],
  providers: [OngService, IsCnpjValidConstraint],
})
export class OngModule { }
