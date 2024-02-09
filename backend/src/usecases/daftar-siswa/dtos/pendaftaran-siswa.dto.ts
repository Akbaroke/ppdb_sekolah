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
  Min,
  ValidateNested,
} from 'class-validator';
import { AGAMA, JENIS_KELAMIN } from 'src/domain/siswa/siswa.interface';
import { ICreateWaliSiswa } from 'src/domain/wali-siswa/wali-siswa.interface';
import { IsAlphaAndSpace } from 'src/infrastucture/common/decorators/isAlphaAndSpace.decorator';

class SiswaDto {
  @IsString({ message: 'type nama harus string' })
  @IsNotEmpty({ message: 'nama harus diisi' })
  @IsAlphaAndSpace()
  nama: string;

  @IsEnum(AGAMA, {
    message:
      'pilihan agama hanya ada islam, protestan, katolik, buddha, dan khonghucu',
  })
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

export class PendaftaranSiswaDto {
  @IsNotEmpty({ message: 'siswa harus diisi' })
  @Type(() => SiswaDto)
  @ValidateNested()
  siswa: SiswaDto;

  @IsNotEmpty({ message: 'wali_siswa harus diisi' })
  @Type(() => WaliSiswaDto)
  @ValidateNested()
  wali_siswa: WaliSiswaDto;
}
