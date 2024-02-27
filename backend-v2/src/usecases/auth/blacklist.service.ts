import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

interface BlacklistData {
  tokens: string[];
  lastReset: number;
}

@Injectable()
export class BlacklistService {
  blacklistFilePath: string;
  resetInterval: number;

  constructor() {
    this.blacklistFilePath = path.join(__dirname, 'blacklist.json');
    this.resetInterval = 24 * 60 * 60 * 1000;
  }

  private readBlacklist(): BlacklistData {
    try {
      const data = fs.readFileSync(this.blacklistFilePath, 'utf8');
      return JSON.parse(data) as BlacklistData;
    } catch (error) {
      return { tokens: [], lastReset: Date.now() };
    }
  }

  private writeBlacklist(data: BlacklistData): void {
    try {
      fs.writeFileSync(
        this.blacklistFilePath,
        JSON.stringify(data, null, 2),
        'utf8',
      );
    } catch (error) {
      console.error('Gagal menulis ke file blacklist.json', error);
    }
  }

  private resetBlacklist(): void {
    const blacklistData = this.readBlacklist();
    blacklistData.tokens = [];
    blacklistData.lastReset = Date.now();
    this.writeBlacklist(blacklistData);
  }

  addTokenToBlacklist(tokenId: string): void {
    const blacklistData = this.readBlacklist();
    blacklistData.tokens.push(tokenId);
    this.writeBlacklist(blacklistData);
  }

  isTokenBlacklisted(tokenId: string): boolean {
    const blacklistData = this.readBlacklist();

    const timeSinceLastReset = Date.now() - blacklistData.lastReset;
    if (timeSinceLastReset >= this.resetInterval) {
      this.resetBlacklist();
    }

    return blacklistData.tokens.includes(tokenId);
  }
}
