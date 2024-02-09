import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Siswa } from './siswa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SiswaRepository {
  constructor(
    @InjectRepository(Siswa)
    private readonly siswaRepository: Repository<Siswa>,
  ) {}
}
