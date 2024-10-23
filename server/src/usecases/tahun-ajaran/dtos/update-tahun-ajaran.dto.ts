import { IsNumber, Min } from 'class-validator';

export class UpdateTahunAjaranDto {
  @IsNumber({}, { message: 'type biaya_daftar harus number' })
  @Min(0, { message: 'biaya_daftar minimal 0' })
  biaya_daftar: number;

  @IsNumber({}, { message: 'type besar_spp harus number' })
  @Min(0, { message: 'besar_spp minimal 0' })
  besar_spp: number;
}
