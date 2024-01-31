import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TahunAjaranService } from 'src/domain/tahun-ajaran/tahun-ajaran.service';
import { CreateTahunAjaranDto } from './tahun-ajaran.dto';
import { Roles } from 'src/infrastucture/common/decorators/roles.decorator';
import { ROLE_USER } from 'src/domain/user/user.interface';
import { ValidationUUID } from 'src/infrastucture/common/filters/validationUUID.filter';

@Controller('tahun_ajaran')
export class TahunAjaranController {
  constructor(private readonly tahunAjaranService: TahunAjaranService) {}

  @Roles(ROLE_USER.ADMIN)
  @Post()
  async create_tahun_ajaran(@Body() body: CreateTahunAjaranDto) {
    return await this.tahunAjaranService.createTahunAjaran(body);
  }

  @Roles(ROLE_USER.ADMIN)
  @Get()
  async get_all_tahun_ajaran() {
    return await this.tahunAjaranService.getAllTahunAjaran();
  }

  @Roles(ROLE_USER.ADMIN, ROLE_USER.USER)
  @Get(':id')
  async get_tahun_ajaran_by_id(
    @Param('id', ValidationUUID)
    id: string,
  ) {
    return await this.tahunAjaranService.getTahunAjaranById(id);
  }
}
