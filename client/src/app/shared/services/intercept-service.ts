import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token-service';

@Injectable({
  providedIn: 'root'
})
export class Intercept implements HttpInterceptor {
    constructor ( private tokenService : TokenService) {}
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            const token = this.tokenService.token;
            if (token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                })
            }
            return next.handle(request);
    }
}
