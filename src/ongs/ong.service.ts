import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OngEntity } from "./entities/ong.entity";
import type { CreateOngDto } from "./dto/create-ong.dto";
import { find } from "rxjs";

@Injectable()
export class OngService {
  constructor(
    @InjectRepository(OngEntity)
    private readonly ongRepository: Repository<OngEntity>,
  ) { }

  async create(data: CreateOngDto, logoFilename: string): Promise<OngEntity> {
    const existing = await this.ongRepository.findOne({
      where: { cnpj: data.cnpj },
    });

    if (existing) {
      throw new Error("CNPJ já cadastrado");
    }

    const ong = this.ongRepository.create({
      ...data,
      logo: logoFilename,
    })

    return this.ongRepository.save(ong)

  }
  async findById(id: string): Promise<OngEntity> {
    const ong = await this.ongRepository.findOne({ where: { id } });

    if (!ong) {
      throw new Error("Ong não encontrada");
    }

    return ong;
  }
  async findByCnpj(cnpj: string): Promise<OngEntity> {
    const ong = await this.ongRepository.findOne({ where: { cnpj } });
    if (!ong) {
      throw new Error("Ong não encontrada");
    }
    return ong;
  }
  async findAll(): Promise<OngEntity[]> {
    return this.ongRepository.find();
  }
}