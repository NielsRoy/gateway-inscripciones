import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { from, Observable, of, switchMap, tap } from 'rxjs';
import * as crypto from "crypto";
import { CachePayload, ContentType } from 'src/cache.service';

@Injectable()
export class DeduplicateInterceptor implements NestInterceptor {

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    if (request.url === '/api/reply') {
      return next.handle();
    }
    const url = this.removeAsyncParam(request.url);
    const payload = {
      endpoint: url,
      method: request.method,
      contentType: ContentType.REQUEST,
      body: request.body,
    };
    const requestHash = this.hashPayload(payload);
    payload.contentType = ContentType.RESPONSE;
    const responseHash = this.hashPayload(payload);
    return from(this.cacheManager.get(requestHash)).pipe(
      switchMap((reqValue) => {
        if (reqValue) {
          //console.log('Ya existe requestHash:', reqValue);
          return of({ message: 'Procesando la petición' });
        }

        // Si no existe requestHash, buscamos el responseHash
        return from(this.cacheManager.get<CachePayload>(responseHash)).pipe(
          switchMap((resValue) => {
            if (resValue) {
              //console.log('Ya existe responseHash:', resValue);
              return of(resValue); // devolvemos la respuesta cacheada
            }

            // Si no existe ninguno, guardamos requestHash
            return from(this.cacheManager.set(requestHash, payload)).pipe(
              switchMap(() => {
                request.hash = requestHash;
                request.responseHash = responseHash;
                return next.handle();
              }),
            );
          }),
        );
      }),
    );
  }

  private hashPayload(request: any): string {
    return crypto.createHash("sha256").update(JSON.stringify(request)).digest("hex");
  }

  private removeAsyncParam(url: string): string {
    return url.replace(/([?&])async=[^&]+&?/, '$1').replace(/[?&]$/, '');
  }
}
