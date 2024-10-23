import { Injectable } from '@nestjs/common';

Injectable();
export class SlugService {
  slug(text: string) {
    return text
      .toLowerCase()
      .replace(/ /g, '_')
      .replace(/[^\w_.]+/g, '');
  }

  reverseSlug(text: string) {
    return text.replace(/_/g, ' ');
  }
}
