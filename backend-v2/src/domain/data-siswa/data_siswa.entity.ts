import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Siswa } from '../siswa/siswa.entity';
import { WaliSiswa } from '../wali-siswa/wali-siswa.entity';
import { File } from '../file/file.entity';
import { JENJANG } from '../kelas/kelas.interface';
import { TahunAjaran } from '../tahun-ajaran/tahun-ajaran.entity';
import { STATUS_SISWA } from './data_siswa.interface';
import { Kelas } from '../kelas/kelas.entity';

@Entity()
@Unique('u_siswa_and_wali_siswa', ['siswa', 'wali_siswa'])
export class DataSiswa {
  @PrimaryGeneratedColumn('uuid')
  data_siswa_id: string;

  @OneToOne(() => WaliSiswa)
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

  @OneToOne(() => File, { nullable: true })
  @JoinColumn({ name: 'ijazah' })
  ijazah?: File;

  @Column({ name: 'jenjang', type: 'enum', enum: JENJANG, nullable: false })
  jenjang: JENJANG;

  @Column({
    name: 'status',
    type: 'enum',
    enum: STATUS_SISWA,
    default: STATUS_SISWA.PENDAFTAR,
  })
  status: STATUS_SISWA;

  @Column({ name: 'nis', nullable: true, unique: true })
  nis?: string;

  @Column({ name: 'no_pendaftaran', unique: true, nullable: false })
  @Index('i_no_pendaftaran')
  no_pendaftaran: string;

  @ManyToOne(() => TahunAjaran, { eager: true })
  @JoinColumn({ name: 'tahun_ajaran' })
  tahun_ajaran: TahunAjaran;

  @ManyToOne(() => Kelas, { eager: true, nullable: true })
  @JoinColumn({ name: 'kelas' })
  kelas?: Kelas;

  @Column({ name: 'keterangan', type: 'text', nullable: true })
  keterangan?: string;

  @Column({
    name: 'tanggal_berakhir',
    type: 'bigint',
    nullable: true,
    unsigned: true,
  })
  tanggal_berakhir?: number;

  @CreateDateColumn({
    type: 'bigint',
    nullable: false,
    default: new Date().getTime(),
    unsigned: true,
  })
  created_at: number;

  @CreateDateColumn({
    type: 'bigint',
    nullable: false,
    default: new Date().getTime(),
    unsigned: true,
  })
  updated_at: number;
}
