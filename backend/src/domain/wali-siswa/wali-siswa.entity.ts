import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DataSiswa } from '../data-siswa/data_siswa.entity';

interface IWaliSiswa {
  wali_id: string;
  nama_ibu: string;
  nama_bapak: string;
  nama_wali: string;
  pekerjaan: string;
  no_telepon: string;
  alamat: string;
  data_siswa: DataSiswa[];
}

@Entity()
export class WaliSiswa implements IWaliSiswa {
  @PrimaryGeneratedColumn('uuid')
  wali_id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  nama_ibu: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  nama_bapak: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nama_wali: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  pekerjaan: string;

  @Column({ type: 'varchar', length: 14, nullable: false })
  no_telepon: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  alamat: string;

  @OneToMany(() => DataSiswa, (data_siswa) => data_siswa.wali_siswa)
  data_siswa: DataSiswa[];
}
