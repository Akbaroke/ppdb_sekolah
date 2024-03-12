import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  Max,
} from 'class-validator';
import { JENJANG } from 'src/domain/kelas/kelas.interface';
import { validationTahunAjaran } from 'src/infrastucture/common/decorators/validationTahunAjaran.decorator';

export class CreateKelasDto {
  @IsEnum(JENJANG, { message: 'jenjang hanya memiliki pg, tka, dan tkb' })
  @IsNotEmpty({ message: 'jenjang harus diisi' })
  jenjang: JENJANG;

  @IsNumber({ allowNaN: false }, { message: 'type kapasitas harus number' })
  @IsNotEmpty({ message: 'kapasitas harus diisi' })
  @Min(5, { message: 'kapasitas minimal 5' })
  @Max(100, { message: 'kapasitas maksimal 100' })
  kapasitas: number;

  @IsString({ message: 'type tahun_ajaran harus string' })
  @IsNotEmpty({ message: 'tahun_ajaran harus diisi' })
  @validationTahunAjaran()
  tahun_ajaran: string;
}
