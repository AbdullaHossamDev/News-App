import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private injector: Injector
  ) { }

  intercept(req, next){
    let authServ = this.injector.get(AuthService);
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${authServ.getToken()}`
      }
    })
    return next.handle(tokenizedReq);

  }
}
