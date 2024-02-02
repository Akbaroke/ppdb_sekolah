import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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

  @Roles(ROLE_USER.ADMIN)
  @Get()
  async get_all_kelas() {
    return await this.kelasService.getAllKelas();
  }

  @Roles(ROLE_USER.ADMIN, ROLE_USER.USER)
  @Get(':id')
  async get_kelas_by_id(
    @Param('id', ValidationUUID)
    id: string,
  ) {
    return await this.kelasService.getKelas(id);
  }

  @Roles(ROLE_USER.ADMIN, ROLE_USER.USER)
  @Patch(':id')
  async update_kelas(
    @Param('id', ValidationUUID)
    id: string,
    @Body() { jenjang, tahun_ajaran }: UpdateKelasDto,
  ) {
    return await this.kelasService.updateKelas(id, jenjang, tahun_ajaran);
  }

  @Roles(ROLE_USER.ADMIN, ROLE_USER.USER)
  @Delete(':id')
  async delete_kelas(
    @Param('id', ValidationUUID)
    id: string,
  ) {
    return await this.kelasService.deleteKelas(id);
  }
}
