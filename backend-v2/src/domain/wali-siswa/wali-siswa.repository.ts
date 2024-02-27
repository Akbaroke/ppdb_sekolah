import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WaliSiswa } from './wali-siswa.entity';
import { Repository } from 'typeorm';
import { IPayloadWaliSiswa } from './wali-siswa.interface';

@Injectable()
export class WaliSiswaRepository {
  constructor(
    @InjectRepository(WaliSiswa)
    private readonly waliSiswaRepository: Repository<WaliSiswa>,
  ) {}

  async findOne(data: IPayloadWaliSiswa): Promise<WaliSiswa> {
    try {
      return await this.waliSiswaRepository.findOne({
        where: data,
      });
    } catch (error) {
      throw error;
    }
  }
}
