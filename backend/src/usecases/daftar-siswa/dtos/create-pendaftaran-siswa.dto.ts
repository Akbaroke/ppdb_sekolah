import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Max,
  MinLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { STATUS_SISWA } from 'src/domain/data-siswa/data_siswa.interface';
import { JENJANG } from 'src/domain/kelas/kelas.interface';
import { AGAMA, JENIS_KELAMIN } from 'src/domain/siswa/siswa.interface';
import { ICreateWaliSiswa } from 'src/domain/wali-siswa/wali-siswa.interface';
import { IsAlphaAndSpace } from 'src/infrastucture/common/decorators/isAlphaAndSpace.decorator';
import { validationTahunAjaran } from 'src/infrastucture/common/decorators/validationTahunAjaran.decorator';

class SiswaDto {
  @IsString({ message: 'type nama harus string' })
  @IsNotEmpty({ message: 'nama harus diisi' })
  @MinLength(3)
  @IsAlphaAndSpace()
  nama: string;

  @IsEnum(AGAMA, {
    message:
      'pilihan agama hanya ada islam, protestan, katolik, buddha, dan khonghucu',
  })
  @IsNotEmpty({ message: 'agama harus diisi' })
  agama: AGAMA;

  @IsEnum(JENIS_KELAMIN, {
    message: 'pilihan jenis_kelamin hanya ada "L" dan "P"',
  })
  jenis_kelamin: JENIS_KELAMIN;

  @IsNumber({ allowNaN: false }, { message: 'type umur harus number' })
  @IsNotEmpty({ message: 'umur harus diisi' })
  @Min(1)
  @Max(100)
  umur: number;

  @IsString({ message: 'type tempat_lahir harus string' })
  @IsNotEmpty({ message: 'tempat_lahir harus diisi' })
  tempat_lahir: string;

  @IsDate({ message: 'type tanggal_lahir harus date' })
  @IsNotEmpty({ message: 'tanggal_lahir harus diisi' })
  tanggal_lahir: Date;

  @IsNumber({ allowNaN: false }, { message: 'type berat_badan harus number' })
  @IsNotEmpty({ message: 'berat_badan harus diisi' })
  @Min(1)
  berat_badan: number;

  @IsNumber({ allowNaN: false }, { message: 'type tinggi_badan harus number' })
  @IsNotEmpty({ message: 'tinggi_badan harus diisi' })
  @Min(1)
  tinggi_badan: number;
}

class WaliSiswaDto implements ICreateWaliSiswa {
  @IsString({ message: 'type nama_ibu harus string' })
  @IsNotEmpty({ message: 'nama_ibu harus diisi' })
  @IsAlphaAndSpace()
  nama_ibu: string;

  @IsString({ message: 'type nama_bapak harus string' })
  @IsNotEmpty({ message: 'nama_bapak harus diisi' })
  @IsAlphaAndSpace()
  nama_bapak: string;

  @IsOptional()
  nama_wali?: string;

  @IsString({ message: 'type no_telepon harus string' })
  @IsPhoneNumber('ID', { message: 'no_telepon tidak sah' })
  no_telepon: string;

  @IsString({ message: 'type pekerjaan harus string' })
  @IsNotEmpty({ message: 'pekerjaan harus diisi' })
  @IsAlphaAndSpace()
  pekerjaan: string;

  @IsString({ message: 'type alamat harus string' })
  @IsNotEmpty({ message: 'alamat harus diisi' })
  alamat: string;
}

export class CreatePendaftaranSiswaDto {
  @IsNotEmpty({ message: 'siswa harus diisi' })
  @Type(() => SiswaDto)
  @ValidateNested()
  siswa: SiswaDto;

  @IsNotEmpty({ message: 'wali_siswa harus diisi' })
  @Type(() => WaliSiswaDto)
  @ValidateNested()
  wali_siswa: WaliSiswaDto;

  @IsString({ message: 'type tahun_ajaran harus string' })
  @IsNotEmpty({ message: 'tahun_ajaran harus diisi' })
  @validationTahunAjaran()
  tahun_ajaran: string;

  @IsEnum(JENJANG, { message: 'jenjang hanya memiliki pg, tka, dan tkb' })
  @IsNotEmpty({ message: 'jenjang harus diisi' })
  jenjang: JENJANG;

  @IsEnum(STATUS_SISWA, {
    message: 'status_siswa hanya memiliki pendaftar, lulus, keluar, dan siswa',
  })
  @IsNotEmpty({ message: 'status_siswa harus diisi' })
  status: STATUS_SISWA;
}
