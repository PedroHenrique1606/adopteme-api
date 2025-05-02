import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller('app')
export class AppController {
  @Get('hello')
  @ApiOperation({ summary: 'Retorna um Hello World!' })
  getHello(): string {
    return 'Hello, world! 🐾'
      ;
  }
}
