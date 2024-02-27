import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid')
  file_id: string;

  @Column({
    name: 'file_firebase_id',
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  file_firebase_id: string;

  @Column({ name: 'url', type: 'varchar', nullable: false, length: 500 })
  url: string;
}
