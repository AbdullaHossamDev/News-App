import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate, CanActivateChild {
  constructor(
    private authServ: AuthService,
    private router: Router
  ){}

  canActivate(): boolean{
    if(this.authServ.isLoggedIn()){
      return true
    }else{
      this.router.navigate(['/home/news'])
      return false;
    }
  }

  canActivateChild(): boolean{
    if(this.authServ.isLoggedIn()){
      this.router.navigate(['/']);
      return false;
    }else{
      return true;
    }
  }
  
}
