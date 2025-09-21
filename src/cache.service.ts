import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable, Logger } from "@nestjs/common";
// import * as crypto from "crypto";

export enum ContentType {
  REQUEST = 'REQUEST',
  RESPONSE = 'RESPONSE',
}

interface HttpResponse {
  hash: string;
  responseHash: string;
  body: any;
}

export interface CachePayload {
  endpoint: string;
  method: string,
  contentType: ContentType,
  body: any,
}

@Injectable()
export class CacheService {
  
  private logger = new Logger('CacheService');

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async handleReply(res: HttpResponse) {
    const { hash, responseHash, body } = res;
    //this.logger.warn({body});
    // const value = await this.cacheManager.get<CachePayload>(hash);
    const value = await this.cacheManager.get(hash);
    await this.cacheManager.set(responseHash, body);
    if (value) {
      await this.cacheManager.del(hash);
    }
  }

  // private hashPayload(request: any): string {
  //   return crypto.createHash("sha256").update(JSON.stringify(request)).digest("hex");
  // }
}