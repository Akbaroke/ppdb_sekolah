import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class File {
  @PrimaryColumn({
    name: 'file_id',
    type: 'varchar',
    nullable: false,
  })
  file_id: string;

  @Column({ name: 'url', type: 'varchar', nullable: false, length: 500 })
  url: string;
}
