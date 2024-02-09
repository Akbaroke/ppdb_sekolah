import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { AGAMA, JENIS_KELAMIN } from './siswa.interface';
import { User } from '../user/user.entity';

interface ISiswa {
  siswa_id: string;
  nama: string;
  tempat_lahir: string;
  tanggal_lahir: Date;
  umur: number;
  jenis_kelamin: JENIS_KELAMIN;
  agama: AGAMA;
  tinggi_badan: number;
  berat_badan: number;
  user: User;
}

@Entity()
@Unique('u_nama_and_user', ['nama', 'user'])
export class Siswa implements ISiswa {
  @PrimaryGeneratedColumn('uuid')
  siswa_id: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  nama: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  tempat_lahir: string;

  @Column({ type: 'date', nullable: false })
  tanggal_lahir: Date;

  @Column({ type: 'tinyint', unsigned: true, nullable: false })
  umur: number;

  @Column({ type: 'enum', enum: JENIS_KELAMIN, default: JENIS_KELAMIN.L })
  jenis_kelamin: JENIS_KELAMIN;

  @Column({ type: 'enum', enum: AGAMA, default: AGAMA.ISLAM })
  agama: AGAMA;

  @Column({ type: 'integer', nullable: false })
  tinggi_badan: number;

  @Column({ type: 'integer', nullable: false })
  berat_badan: number;

  @ManyToOne(() => User, (user) => user.siswa)
  @JoinColumn({ name: 'user' })
  user: User;
}
