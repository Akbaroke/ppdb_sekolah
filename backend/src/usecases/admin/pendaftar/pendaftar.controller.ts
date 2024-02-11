import { Body, Controller, Post } from '@nestjs/common';
import { ROLE_USER } from 'src/domain/user/user.interface';
import { Roles } from 'src/infrastucture/common/decorators/roles.decorator';
import { ACCDTO } from './dtos/acc.dto';
import { PendaftaranService } from './pendaftar.service';

@Controller('pendaftar')
export class PendaftarController {
  constructor(private readonly pendaftarService: PendaftaranService) {}

  @Roles(ROLE_USER.ADMIN)
  @Post('acc')
  async acc_siswa(@Body() { kelas_id, siswa_id }: ACCDTO) {
    return await this.pendaftarService.acc(siswa_id, kelas_id);
  }
}
