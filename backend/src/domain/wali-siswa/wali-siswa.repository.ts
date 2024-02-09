import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WaliSiswa } from './wali-siswa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WaliSiswaRepository {
  constructor(
    @InjectRepository(WaliSiswa)
    private readonly siswaRepository: Repository<WaliSiswa>,
  ) {}
}
