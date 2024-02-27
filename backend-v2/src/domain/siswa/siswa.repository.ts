import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Siswa } from './siswa.entity';
import { Repository } from 'typeorm';
import { IFindSiswa } from './siswa.interface';

@Injectable()
export class SiswaRepository {
  constructor(
    @InjectRepository(Siswa)
    private readonly siswaRepository: Repository<Siswa>,
  ) {}

  async find(data: IFindSiswa): Promise<Siswa> {
    try {
      return await this.siswaRepository.findOne({ where: data });
    } catch (error) {
      throw error;
    }
  }
}
