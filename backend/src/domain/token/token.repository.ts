import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './token.entity';
import { Repository } from 'typeorm';
import {
  IGetToken,
  IPayloadSaveToken,
  ITokenRepository,
} from './token.interface';

@Injectable()
export class TokenRepository implements ITokenRepository {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  //   masih ada salah disini
  async findOne(payload: IGetToken): Promise<Token> {
    const data = await this.tokenRepository.findOne({
      where: {
        user: payload.user,
      },
    });

    return data;
  }

  async saveToken(payload: IPayloadSaveToken): Promise<Token> {
    return await this.tokenRepository.save(payload);
  }
}
