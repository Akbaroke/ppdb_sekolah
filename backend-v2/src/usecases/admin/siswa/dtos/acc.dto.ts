import { ArrayMaxSize, IsUUID, ArrayNotEmpty } from 'class-validator';

export class AcceptSiswaDTO {
  @IsUUID('all', {
    each: true,
    message: 'semua nilai dalam siswa_id harus UUID',
  })
  @ArrayNotEmpty({ message: 'siswa_id harus diisi' })
  @ArrayMaxSize(50, { message: 'maksimum 10 elemen dalam siswa_id' })
  siswa_id: string[];
}
