import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

interface IToken {
  token_id: string;
  accessToken?: string;
  refreshToken?: string;
  user: User;
}

@Entity()
export class Token implements IToken {
  @PrimaryGeneratedColumn('uuid')
  token_id: string;

  @Column({ type: 'varchar', nullable: false, length: 1255 })
  accessToken?: string;

  @Column({ type: 'varchar', nullable: false, length: 1255 })
  refreshToken?: string;

  @OneToOne(() => User, (user) => user.token, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user' })
  user: User;

  constructor(data: Partial<Token>) {
    Object.assign(this, data);
  }
}
