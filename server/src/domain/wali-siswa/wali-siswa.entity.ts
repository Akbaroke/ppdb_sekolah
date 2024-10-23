import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

interface IWaliSiswa {
  wali_siswa_id: string;
  nama_ibu: string;
  nama_bapak: string;
  nama_wali: string;
  pekerjaan: string;
  no_telepon: string;
  alamat: string;
}

@Entity()
export class WaliSiswa implements IWaliSiswa {
  @PrimaryGeneratedColumn('uuid')
  wali_siswa_id: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  nama_ibu: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  nama_bapak: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  nama_wali: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  pekerjaan: string;

  @Column({ type: 'varchar', length: 14, nullable: false })
  no_telepon: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  alamat: string;
}
