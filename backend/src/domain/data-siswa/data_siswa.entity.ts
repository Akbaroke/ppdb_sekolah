import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Siswa } from '../siswa/siswa.entity';
import { WaliSiswa } from '../wali-siswa/wali-siswa.entity';
import { File } from '../file/file.entity';

export enum STATUS_SISWA {
  DAFTAR = 'daftar',
  SISWA = 'siswa',
  KELUAR = 'keluar',
  LULUS = 'lulus',
}

@Entity()
@Unique('u_siswa_and_wali_siswa', ['siswa', 'wali_siswa'])
export class DataSiswa {
  @PrimaryGeneratedColumn('uuid')
  data_siswa_id: string;

  @ManyToOne(() => WaliSiswa, (wali_siswa) => wali_siswa.data_siswa)
  @JoinColumn({ name: 'wali_siswa' })
  wali_siswa: WaliSiswa;

  @OneToOne(() => Siswa)
  @JoinColumn({ name: 'siswa' })
  siswa: Siswa;

  @OneToOne(() => File)
  @JoinColumn({ name: 'akta' })
  akta: File;

  @OneToOne(() => File)
  @JoinColumn({ name: 'kartu_keluarga' })
  kartu_keluarga: File;

  @OneToOne(() => File)
  @JoinColumn({ name: 'foto' })
  foto: File;

  @CreateDateColumn({
    type: 'bigint',
    nullable: false,
    default: Date.now(),
  })
  created_at: number;

  @CreateDateColumn({
    type: 'bigint',
    nullable: false,
    default: Date.now(),
  })
  updated_at: number;
}
