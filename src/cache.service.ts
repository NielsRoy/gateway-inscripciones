import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";

interface HttpResponse {
  hash: string;
  body: any;
}

@Injectable()
export class CacheService {
  
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async handleReply(res: HttpResponse) {
    const { hash, body } = res;
    const value = await this.cacheManager.get(hash);
    if (value) {
      await this.cacheManager.del(hash);
    }
    console.log(res);
  }

}