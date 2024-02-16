import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTahunAjaranDto } from './dtos/create-tahun-ajaran.dto';
import { Roles } from 'src/infrastucture/common/decorators/roles.decorator';
import { ROLE_USER } from 'src/domain/user/user.interface';
import { ValidationUUID } from 'src/infrastucture/common/filters/validationUUID.filter';
import { UsecaseTahunAjaranService } from './tahun-ajaran.service';
import { UpdateTahunAjaranDto } from './dtos/update-tahun-ajaran.dto';

@Controller('tahun_ajaran')
export class TahunAjaranController {
  constructor(private readonly tahunAjaranService: UsecaseTahunAjaranService) {}

  @Roles(ROLE_USER.ADMIN)
  @Post()
  async create_tahun_ajaran(@Body() body: CreateTahunAjaranDto) {
    return await this.tahunAjaranService.createTahunAjaran(body);
  }

  @Roles(ROLE_USER.ADMIN)
  @Patch(':id')
  async update_tahun_ajaran(
    @Param('id', ValidationUUID)
    id: string,
    @Body() body: UpdateTahunAjaranDto,
  ) {
    return await this.tahunAjaranService.updateTahunAjaran(id, body);
  }

  @Roles(ROLE_USER.ADMIN, ROLE_USER.USER)
  @Get()
  async get_all_tahun_ajaran(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit?: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page?: number,
    @Query('latest', new DefaultValuePipe(true), ParseBoolPipe)
    latest?: boolean,
    @Query('s', new DefaultValuePipe(null)) search?: string,
  ) {
    return await this.tahunAjaranService.getAllTahunAjaran(
      limit,
      page,
      latest,
      search,
    );
  }

  @Roles(ROLE_USER.ADMIN, ROLE_USER.USER)
  @Get(':id')
  async get_tahun_ajaran_by_id(
    @Param('id', ValidationUUID)
    id: string,
  ) {
    return await this.tahunAjaranService.getTahunAjaran(id);
  }
}
