import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';
import { ROLE_USER, STATUS_USER } from './user.interface';
import { Token } from '../token/token.entity';

interface IUser {
  user_id: string;
  email: string;
  password: string;
  status: STATUS_USER;
  role: ROLE_USER;
  token: Token;
  created_at: number;
  updated_at: number;
}

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column({
    name: 'email',
    type: 'varchar',
    unique: true,
    length: 317,
    nullable: false,
  })
  @Index('i_email')
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ enum: STATUS_USER, default: STATUS_USER.PENDING, type: 'enum' })
  status: STATUS_USER;

  @Column({ enum: ROLE_USER, default: ROLE_USER.SISWA, type: 'enum' })
  role: ROLE_USER;

  @OneToOne(() => Token, (token) => token.user)
  token: Token;

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