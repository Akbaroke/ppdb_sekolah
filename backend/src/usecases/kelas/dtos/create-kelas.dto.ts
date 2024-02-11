import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { JENJANG } from 'src/domain/kelas/kelas.interface';
import { validationTahunAjaran } from 'src/infrastucture/common/decorators/validationTahunAjaran.decorator';

export class CreateKelasDto {
  @IsEnum(JENJANG, { message: 'jenjang hanya memiliki pg, tka, dan tkb' })
  @IsNotEmpty({ message: 'jenjang harus diisi' })
  jenjang: JENJANG;

  @IsString({ message: 'type tahun_ajaran harus string' })
  @IsNotEmpty({ message: 'tahun_ajaran harus diisi' })
  @validationTahunAjaran()
  tahun_ajaran: string;
}
