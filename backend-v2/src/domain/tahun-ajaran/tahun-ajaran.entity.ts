import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Kelas } from '../kelas/kelas.entity';

interface ITahunAjaran {
  tahun_ajaran_id: string;
  tahun_ajaran: string;
  besar_spp: number;
  biaya_daftar: number;
  created_at: number;
  updated_at: number;
}

@Entity()
export class TahunAjaran implements ITahunAjaran {
  @PrimaryGeneratedColumn('uuid')
  tahun_ajaran_id: string;

  @Column({
    name: 'tahun_ajaran',
    type: 'varchar',
    length: 9,
    nullable: false,
    unique: true,
  })
  @Index('i_tahun_ajaran')
  tahun_ajaran: string;

  @Column({
    name: 'besar_spp',
    type: 'bigint',
    nullable: false,
    unsigned: true,
  })
  besar_spp: number;

  @Column({
    name: 'biaya_daftar',
    type: 'bigint',
    nullable: false,
    unsigned: true,
  })
  biaya_daftar: number;

  @ManyToMany(() => Kelas, (kelas) => kelas.tahun_ajaran)
  kelas: Kelas;

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
