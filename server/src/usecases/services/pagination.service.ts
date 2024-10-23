import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {
  createPagination(
    totalData: number,
    limit: number,
    page: number,
    start: number,
  ) {
    const pagination = {};
    const end = page * limit;

    Object.assign(pagination, {
      totalData,
      totalPage: Math.ceil(totalData / limit),
      currentPage: page,
    });

    if (end < totalData) {
      Object.assign(pagination, {
        next: {
          page: page + 1,
          limit_item: limit,
          remaining: totalData - (start + limit),
        },
      });
    }

    if (start > 0 && page - Math.ceil(totalData / limit) < 1) {
      Object.assign(pagination, {
        prev: {
          page: page - 1,
          limit,
          ramaining: totalData - (totalData - start),
        },
      });
    }

    if (page - Math.ceil(totalData / limit) === 1) {
      Object.assign(pagination, {
        prev: { remaining: totalData },
      });
    }

    return pagination;
  }
}
