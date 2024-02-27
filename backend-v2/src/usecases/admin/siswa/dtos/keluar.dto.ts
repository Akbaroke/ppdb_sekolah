import { IsNotEmpty, IsString } from 'class-validator';
import { IsAlpha } from 'src/infrastucture/common/decorators/isAlpha.decorator';
import { LulusDTO } from './lulus.dto';

export class KeluarDTO extends LulusDTO {
  @IsString({ message: 'type keterangan harus string' })
  @IsNotEmpty({ message: 'keterangan harus diisi' })
  @IsAlpha()
  keterangan: string;
}
