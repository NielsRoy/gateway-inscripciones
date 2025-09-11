import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { from, Observable, of, switchMap } from 'rxjs';
import * as crypto from "crypto";

@Injectable()
export class DeduplicateInterceptor implements NestInterceptor {

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    console.log(request.url);
    if (request.url === '/api/reply') {
      return next.handle();
    }

    const payload = {
      endpoint: request.url,
      method: request.method,
      body: request.body,
    };

    const hash = this.hashPayload(payload);
    
    return from(this.cacheManager.get(hash)).pipe(
      switchMap((value) => {
        if (value) {
          console.log(value);
          return of({ message: 'Procesando la petición' });
        }

        return from(this.cacheManager.set(hash, payload)).pipe(
          switchMap(() => {
            request.hash = hash; 
            return next.handle(); 
          })
        );
      }),
    );
  }

  private hashPayload(request: any): string {
    return crypto.createHash("sha256").update(JSON.stringify(request)).digest("hex");
  }
}
