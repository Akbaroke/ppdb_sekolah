import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePendaftaranSiswaDto } from './dtos/create-pendaftaran-siswa.dto';
import { UpdatePendaftaranSiswaDto } from './dtos/update-pendaftaran-siswa.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { DaftarSiswaService } from './daftar-siswa.service';
import { ParseFilesPipe } from 'src/infrastucture/common/pipe/parseFiles.pipe';
import { GetUser } from 'src/infrastucture/common/decorators/getUser.decorator';
import { Roles } from 'src/infrastucture/common/decorators/roles.decorator';
import { ROLE_USER } from 'src/domain/user/user.interface';
import { ValidationUUID } from 'src/infrastucture/common/filters/validationUUID.filter';
import { IPayloadToken } from 'src/infrastucture/authentication/token-management/token.interface';

@Controller('daftar_siswa')
export class DaftarSiswaController {
  constructor(private readonly daftarSiswaService: DaftarSiswaService) {}

  @Roles(ROLE_USER.USER, ROLE_USER.ADMIN)
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
    @Body() body: CreatePendaftaranSiswaDto,
    @UploadedFiles(ParseFilesPipe)
    berkas: {
      akta: Express.Multer.File;
      kartu_keluarga: Express.Multer.File;
      foto: Express.Multer.File;
    },
  ) {
    return await this.daftarSiswaService.daftarSiswa(id, body, berkas);
  }

  @Roles(ROLE_USER.USER)
  @Get()
  async get_all_daftar_siswa(@GetUser() { id }: IPayloadToken) {
    return await this.daftarSiswaService.getAllDaftarSiswa(id);
  }

  @Roles(ROLE_USER.USER, ROLE_USER.ADMIN)
  @Get(':id')
  async get_daftar_siswa(
    @GetUser() { id, role }: IPayloadToken,
    @Param('id') siswa_id: string,
  ) {
    return await this.daftarSiswaService.getDataSiswa(siswa_id, id, role);
  }

  @Roles(ROLE_USER.USER, ROLE_USER.ADMIN)
  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'akta', maxCount: 1 },
      { name: 'kartu_keluarga', maxCount: 1 },
      { name: 'foto', maxCount: 1 },
    ]),
  )
  async update_daftar_siswa(
    @GetUser() payload: IPayloadToken,
    @Param('id', ValidationUUID) siswa_id: string,
    @Body() body: UpdatePendaftaranSiswaDto,
    @UploadedFiles(ParseFilesPipe)
    berkas: {
      akta?: Express.Multer.File;
      kartu_keluarga?: Express.Multer.File;
      foto?: Express.Multer.File;
    },
  ) {
    return await this.daftarSiswaService.updateDaftarSiswa(
      siswa_id,
      payload,
      body,
      berkas,
    );
  }
}
