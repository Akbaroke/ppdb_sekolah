import { IsUUID, IsNotEmpty, IsString } from 'class-validator';

export class LulusDTO {
  @IsString({ message: 'type siswa_id harus string' })
  @IsUUID('all', { message: 'siswa_id harus uuid' })
  @IsNotEmpty({ message: 'siswa_id harus diisi' })
  siswa_id: string;
}
