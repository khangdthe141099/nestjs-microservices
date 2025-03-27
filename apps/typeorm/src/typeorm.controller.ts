import { Body, Controller, Get, Post } from '@nestjs/common';
import { TypeormService } from './typeorm.service';
import { CreateDto } from './dto/create.dto';

@Controller()
export class TypeormController {
  constructor(private readonly typeormService: TypeormService) {}

  @Get()
  getHello(): string {
    return this.typeormService.getHello();
  }

  @Post('create')
  async create(@Body() createDto: CreateDto) {
    return await this.typeormService.create(createDto);
  }
}
