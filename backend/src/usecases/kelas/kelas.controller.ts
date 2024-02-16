import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsecaseKelasService as KelasService } from './kelas.service';
import { Roles } from 'src/infrastucture/common/decorators/roles.decorator';
import { ROLE_USER } from 'src/domain/user/user.interface';
import { CreateKelasDto } from './dtos/create-kelas.dto';
import { ValidationUUID } from 'src/infrastucture/common/filters/validationUUID.filter';
import { UpdateKelasDto } from './dtos/update-kelas.dto';

@Controller('kelas')
export class KelasController {
  constructor(private readonly kelasService: KelasService) {}

  @Roles(ROLE_USER.ADMIN)
  @Post()
  async create_kelas(@Body() { jenjang, tahun_ajaran }: CreateKelasDto) {
    return await this.kelasService.createKelas(jenjang, tahun_ajaran);
  }

  @Roles(ROLE_USER.ADMIN, ROLE_USER.USER)
  @Get()
  async get_all_kelas(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit?: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page?: number,
    @Query('latest', new DefaultValuePipe(true), ParseBoolPipe)
    latest?: boolean,
    @Query('s', new DefaultValuePipe(undefined)) search?: string,
  ) {
    return await this.kelasService.getAllKelas(limit, page, latest, search);
  }

  @Roles(ROLE_USER.ADMIN, ROLE_USER.USER)
  @Get(':id')
  async get_kelas_by_id(
    @Param('id', ValidationUUID)
    id: string,
  ) {
    return await this.kelasService.getKelas(id);
  }

  @Roles(ROLE_USER.ADMIN)
  @Patch(':id')
  async update_kelas(
    @Param('id', ValidationUUID)
    id: string,
    @Body() { jenjang, tahun_ajaran }: UpdateKelasDto,
  ) {
    return await this.kelasService.updateKelas(id, jenjang, tahun_ajaran);
  }

  @Roles(ROLE_USER.ADMIN)
  @Delete(':id')
  async delete_kelas(
    @Param('id', ValidationUUID)
    id: string,
  ) {
    return await this.kelasService.deleteKelas(id);
  }
}
