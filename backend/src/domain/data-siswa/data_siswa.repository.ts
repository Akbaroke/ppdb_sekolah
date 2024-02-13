import { Injectable } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { DataSiswa } from './data_siswa.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DataSiswaRepository {
  constructor(
    @InjectRepository(DataSiswa)
    private readonly dataSiswaRepository: Repository<DataSiswa>,
  ) {}

  async findAllAndCount(
    options: FindManyOptions<DataSiswa>,
  ): Promise<{ data: DataSiswa[]; count: number }> {
    try {
      const [data, count] = await this.dataSiswaRepository.findAndCount({
        ...(options || { take: 100 }),
      });

      return { data, count };
    } catch (error) {
      throw error;
    }
  }

  async findOne(options: FindOneOptions<DataSiswa>) {
    try {
      return await this.dataSiswaRepository.findOne({
        ...options,
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(options: FindManyOptions<DataSiswa>) {
    try {
      return await this.dataSiswaRepository.find({
        ...(options || { take: 100 }),
      });
    } catch (error) {
      throw error;
    }
  }
}
