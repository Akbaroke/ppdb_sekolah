import { IsUUID, IsNotEmpty, IsString } from 'class-validator';

export class ACCDTO {
  @IsString({ message: 'type siswa_id harus string' })
  @IsUUID('all', { message: 'siswa_id harus uuid' })
  @IsNotEmpty({ message: 'siswa_id harus diisi' })
  siswa_id: string;

  @IsUUID('all', { message: 'kelas_id harus uuid' })
  @IsString({ message: 'type kelas_id harus string' })
  @IsNotEmpty({ message: 'kelas_id harus diisi' })
  kelas_id: string;
}
