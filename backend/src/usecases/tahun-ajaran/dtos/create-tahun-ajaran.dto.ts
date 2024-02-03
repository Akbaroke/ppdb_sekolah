import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ICreateTahunAjaran } from 'src/domain/tahun-ajaran/tahun-ajaran.interface';
import { validationTahunAjaran } from 'src/infrastucture/common/decorators/validationTahunAjaran.decorator';

export class CreateTahunAjaranDto implements ICreateTahunAjaran {
  @IsNumber({}, { message: 'type biaya_daftar harus number' })
  @Min(0, { message: 'biaya_daftar minimal 0' })
  biaya_daftar: number;

  @IsString({ message: 'type tahun_ajaran harus string' })
  @IsNotEmpty({ message: 'tahun_ajaran harus diisi' })
  @validationTahunAjaran()
  tahun_ajaran: string;

  @IsNumber({}, { message: 'type besar_spp harus number' })
  @Min(0, { message: 'besar_spp minimal 0' })
  besar_spp: number;

  constructor(partial: Partial<CreateTahunAjaranDto>) {
    Object.assign(this, partial);
  }
}
