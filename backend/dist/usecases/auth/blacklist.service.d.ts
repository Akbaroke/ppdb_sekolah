export declare class BlacklistService {
    blacklistFilePath: string;
    resetInterval: number;
    constructor();
    private readBlacklist;
    private writeBlacklist;
    private resetBlacklist;
    addTokenToBlacklist(tokenId: string): void;
    isTokenBlacklisted(tokenId: string): boolean;
}
