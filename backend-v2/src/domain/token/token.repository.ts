import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './token.entity';
import { Repository, UpdateResult } from 'typeorm';
import { IGetToken, IPayloadSaveToken } from './token.interface';

@Injectable()
export class TokenRepository {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async findToken(payload: IGetToken): Promise<Token> {
    try {
      const data = await this.tokenRepository.findOne({
        where: {
          user: payload.user,
        },
      });

      return data;
    } catch (error) {
      throw error;
    }
  }

  async findTokenByAccessToken(accessToken: string): Promise<Token> {
    try {
      const data = await this.tokenRepository.findOne({
        where: {
          accessToken,
        },
        relations: { user: true },
        select: { user: { user_id: true, email: true, role: true } },
      });

      return data;
    } catch (error) {
      throw error;
    }
  }

  async saveToken(payload: IPayloadSaveToken): Promise<Token> {
    try {
      return await this.tokenRepository.save(payload);
    } catch (error) {
      throw error;
    }
  }

  async updateToken(
    accessToken: string,
    payload?: { accessToken?: string; refreshToken?: string },
  ): Promise<UpdateResult> {
    try {
      return await this.tokenRepository.update({ accessToken }, payload);
    } catch (error) {
      throw error;
    }
  }
}
