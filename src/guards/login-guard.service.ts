
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class LoginGuardService implements CanActivate {
  constructor(
      private router: Router,
      private authSvc: AuthService,
      private toast: HotToastService
    ) {}
  async canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Promise<boolean> {

    if(this.authSvc.isLoggedIn){
      return true
    }else{
      this.router.navigate(['/auth/login'])
      this.toast.warning("Anda harus login untuk melanjutkkan")
      return false
    }
  }
}