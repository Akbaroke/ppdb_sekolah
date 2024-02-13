import { IsUUID, IsNotEmpty, IsString } from 'class-validator';
import { LulusDTO } from './lulus.dto';

export class ACCDTO extends LulusDTO {
  @IsUUID('all', { message: 'kelas_id harus uuid' })
  @IsString({ message: 'type kelas_id harus string' })
  @IsNotEmpty({ message: 'kelas_id harus diisi' })
  kelas_id: string;
}
