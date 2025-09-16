import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import * as crypto from "crypto";

export enum ContentType {
  REQUEST = 'REQUEST',
  RESPONSE = 'RESPONSE',
}

interface HttpResponse {
  hash: string;
  contentType: ContentType; 
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
  
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async handleReply(res: HttpResponse) {
    const { hash, body } = res;
    //console.log('body en CacheService: ', body);
    const value = await this.cacheManager.get<CachePayload>(hash);
    if (value) {
      value.contentType = ContentType.RESPONSE;
    }
    //console.log('value en CacheService: ', value);
    const responseHash = this.hashPayload(value);
    await this.cacheManager.set(responseHash, body);
    if (value) {
      await this.cacheManager.del(hash);
    }
  }

  private hashPayload(request: any): string {
    return crypto.createHash("sha256").update(JSON.stringify(request)).digest("hex");
  }
}