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

  @Column({ name: 'nama', type: 'varchar', length: 60, nullable: false })
  nama: string;

  @Column({
    name: 'tempat_lahir',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  tempat_lahir: string;

  @Column({ name: 'tanggal_lahir', type: 'date', nullable: false })
  tanggal_lahir: Date;

  @Column({ name: 'umur', type: 'tinyint', unsigned: true, nullable: false })
  umur: number;

  @Column({
    name: 'jenis_kelamin',
    type: 'enum',
    enum: JENIS_KELAMIN,
    default: JENIS_KELAMIN.L,
  })
  jenis_kelamin: JENIS_KELAMIN;

  @Column({ name: 'agama', type: 'enum', enum: AGAMA, default: AGAMA.ISLAM })
  agama: AGAMA;

  @Column({
    name: 'tinggi_badan',
    type: 'tinyint',
    nullable: false,
    unsigned: true,
  })
  tinggi_badan: number;

  @Column({
    name: 'berat_badan',
    type: 'tinyint',
    nullable: false,
    unsigned: true,
  })
  berat_badan: number;

  @Column({ name: 'user_id', type: 'varchar', nullable: false })
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user: User;
}
