import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Express } from 'express';
import { OngService } from './ong.service';
import { CreateOngDto } from './dto/create-ong.dto';

@ApiTags('ONGs')
@Controller('ongs')
export class OngController {
  constructor(private readonly ongService: OngService) { }

  @Post()
  @ApiOperation({ summary: 'Cadastrar nova ONG' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Formulário de cadastro da ONG com logo',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        cnpj: { type: 'string' },
        cep: { type: 'string' },
        street: { type: 'string' },
        number: { type: 'string' },
        complement: { type: 'string' },
        neighborhood: { type: 'string' },
        city: { type: 'string' },
        state: { type: 'string' },
        phone: { type: 'string' },
        email: { type: 'string' },
        description: { type: 'string' },
        logo: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const ext = extname(file.originalname);
          cb(null, `${Date.now()}${ext}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        const allowed = ['.jpg', '.jpeg', '.png'];
        const ext = extname(file.originalname).toLowerCase();
        if (!allowed.includes(ext)) {
          return cb(new BadRequestException('Extensão de imagem inválida'), false);
        }
        cb(null, true);
      },
    }),
  )
  async create(
    @Body() body: CreateOngDto,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    if (!logo) throw new BadRequestException('Logo obrigatória');
    return this.ongService.create(body, logo.filename);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as ONGs cadastradas' })
  async findAll() {
    const ongs = await this.ongService.findAll();

    return ongs.map((ong) => ({
      ...ong,
      logo_url: `${process.env.BASE_URL || 'http://localhost:8080'}/uploads/${ong.logo}`,
    }));
  }
}
