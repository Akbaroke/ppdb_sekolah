import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
} from 'typeorm';
import { TYPE_OTP } from './otp.interface';

interface IOtp {
  otp_id: string;
  email: string;
  otp: string;
  type_otp: TYPE_OTP;
  used: boolean;
  created_at: number;
  updated_at: number;
  expires_at: number;
}

@Entity()
export class Otp implements IOtp {
  @PrimaryGeneratedColumn('uuid')
  otp_id: string;

  @Column({
    name: 'email',
    type: 'varchar',
    unique: true,
    length: 317,
    nullable: false,
  })
  @Index('i_email')
  email: string;

  @Column({ name: 'otp', type: 'varchar', length: 5, nullable: false })
  otp: string;

  @Column({ name: 'type_otp', type: 'enum', enum: TYPE_OTP, nullable: false })
  type_otp: TYPE_OTP;

  @Column({ name: 'used', type: 'boolean', default: false })
  used: boolean;

  @CreateDateColumn({
    type: 'bigint',
    nullable: false,
    default: Date.now(),
  })
  created_at: number;

  @CreateDateColumn({
    type: 'bigint',
    nullable: false,
    default: Date.now() + 180_000,
  })
  expires_at: number;

  @CreateDateColumn({
    type: 'bigint',
    nullable: false,
    default: Date.now(),
  })
  updated_at: number;
}
