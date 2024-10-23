import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ROLE_USER } from 'src/domain/user/user.interface';
import { Roles } from 'src/infrastucture/common/decorators/roles.decorator';
import { AcceptSiswaDTO } from './dtos/acc.dto';
import { SiswaService } from './siswa.service';
import { STATUS_SISWA } from 'src/domain/data-siswa/data_siswa.interface';
import { KeluarDTO } from './dtos/keluar.dto';
import { LulusDTO } from './dtos/lulus.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParseFilePipe } from 'src/infrastucture/common/pipe/parseFile.pipe';

@Controller('siswa')
export class SiswaController {
  constructor(private readonly siswaService: SiswaService) {}

  @Roles(ROLE_USER.ADMIN)
  @Post('acc')
  async acc_siswa(@Body() { siswa_id }: AcceptSiswaDTO) {
    return await this.siswaService.acc(siswa_id);
  }

  @Roles(ROLE_USER.ADMIN)
  @Post('keluar')
  async keluarkan_siswa(@Body() { siswa_id, keterangan }: KeluarDTO) {
    return await this.siswaService.keluar(siswa_id, keterangan);
  }

  @Roles(ROLE_USER.ADMIN)
  @UseInterceptors(FileInterceptor('ijazah'))
  @Post('lulus')
  async luluskan_siswa(
    @Body() { siswa_id }: LulusDTO,
    @UploadedFile(ParseFilePipe) file: Express.Multer.File,
  ) {
    return await this.siswaService.lulus(siswa_id, file);
  }

  @Roles(ROLE_USER.ADMIN)
  @Get()
  async get_siswa(
    @Query('status')
    status?: STATUS_SISWA,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit?: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page?: number,
    @Query('latest', new DefaultValuePipe(true), ParseBoolPipe)
    latest?: boolean,
    @Query('s', new DefaultValuePipe(undefined)) search?: string,
  ) {
    return await this.siswaService.getAllDataSiswa(
      status,
      limit,
      page,
      latest,
      search,
    );
  }
}
