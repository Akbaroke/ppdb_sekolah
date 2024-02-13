import { IsNotEmpty, IsString } from 'class-validator';
import { IsAlphaAndSpace } from 'src/infrastucture/common/decorators/isAlphaAndSpace.decorator';
import { LulusDTO } from './lulus.dto';

export class KeluarDTO extends LulusDTO {
  @IsString({ message: 'type keterangan harus string' })
  @IsNotEmpty({ message: 'keterangan harus diisi' })
  @IsAlphaAndSpace()
  keterangan: string;
}
