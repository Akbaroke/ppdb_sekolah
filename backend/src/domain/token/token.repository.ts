import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './token.entity';
import { Repository, UpdateResult } from 'typeorm';
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

  async findToken(payload: IGetToken): Promise<Token> {
    const data = await this.tokenRepository.findOne({
      where: {
        user: payload.user,
      },
    });

    return data;
  }

  async findTokenByAccessToken(accessToken: string): Promise<Token> {
    const data = await this.tokenRepository.findOne({
      where: {
        accessToken,
      },
      relations: { user: true },
      select: { user: { user_id: true, email: true, role: true } },
    });

    return data;
  }

  async saveToken(payload: IPayloadSaveToken): Promise<Token> {
    return await this.tokenRepository.save(payload);
  }

  async updateToken(
    accessToken: string,
    payload?: { accessToken?: string; refreshToken?: string },
  ): Promise<UpdateResult> {
    return await this.tokenRepository.update({ accessToken }, payload);
  }
}
