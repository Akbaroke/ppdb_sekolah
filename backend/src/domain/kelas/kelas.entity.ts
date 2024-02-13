import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { JENJANG } from './kelas.interface';
import { TahunAjaran } from '../tahun-ajaran/tahun-ajaran.entity';

interface IKelas {
  kelas_id: string;
  kelas: string;
  jenjang: JENJANG;
  kode_kelas: string;
  jumlah_siswa: number;
  tahun_ajaran: TahunAjaran;
  created_at: number;
  updated_at: number;
}

@Entity()
@Unique('u_kelas_and_kode_kelas', ['kelas', 'kode_kelas', 'tahun_ajaran'])
export class Kelas implements IKelas {
  @PrimaryGeneratedColumn('uuid')
  kelas_id: string;

  @Column({
    name: 'kelas',
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  kelas: string;

  @Column({ name: 'jenjang', type: 'enum', enum: JENJANG, nullable: false })
  jenjang: JENJANG;

  @Column({
    name: 'kode_kelas',
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  kode_kelas: string;

  @Column({
    name: 'jumlah_siswa',
    type: 'smallint',
    unsigned: true,
    default: 0,
    nullable: true,
  })
  jumlah_siswa: number;

  @ManyToOne(() => TahunAjaran, (tahun_ajaran) => tahun_ajaran.kelas, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tahun_ajaran' })
  tahun_ajaran: TahunAjaran;

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
