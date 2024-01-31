import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column({ type: 'varchar', length: 9, nullable: false, unique: true })
  @Index('i_tahun_ajaran')
  tahun_ajaran: string;

  @Column({ type: 'int', nullable: false, unsigned: true })
  besar_spp: number;

  @Column({ type: 'int', nullable: false, unsigned: true })
  biaya_daftar: number;

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
