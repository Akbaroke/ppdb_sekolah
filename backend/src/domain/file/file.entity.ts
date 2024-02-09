import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid')
  file_id: string;

  @Column({
    name: 'id',
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  id: string;

  @Column({ name: 'url', type: 'varchar', nullable: false })
  url: string;
}
