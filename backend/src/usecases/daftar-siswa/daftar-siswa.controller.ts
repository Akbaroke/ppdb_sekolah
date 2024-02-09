import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PendaftaranSiswaDto } from './dtos/pendaftaran-siswa.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { DaftarSiswaService } from './daftar-siswa.service';
import { ParseFilesPipe } from 'src/infrastucture/common/pipe/parseFiles.pipe';
import { GetUser } from 'src/infrastucture/common/decorators/getUser.decorator';
import { Roles } from 'src/infrastucture/common/decorators/roles.decorator';
import { ROLE_USER } from 'src/domain/user/user.interface';

@Controller('daftar_siswa')
export class DaftarSiswaController {
  constructor(private readonly daftarSiswaService: DaftarSiswaService) {}

  @Roles(ROLE_USER.ADMIN, ROLE_USER.USER)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'akta', maxCount: 1 },
      { name: 'kartu_keluarga', maxCount: 1 },
      { name: 'foto', maxCount: 1 },
    ]),
  )
  async daftar_siswa(
    @GetUser() { id }: { id: string },
    @Body() body: PendaftaranSiswaDto,
    @UploadedFiles(ParseFilesPipe)
    berkas: {
      akta: Express.Multer.File;
      kartu_keluarga: Express.Multer.File;
      foto: Express.Multer.File;
    },
  ) {
    return await this.daftarSiswaService.pendaftaranSiswa(id, body, berkas);
  }
}
