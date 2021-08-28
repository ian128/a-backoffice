
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class LoginGuardService implements CanActivate {
  constructor(
      public router: Router,
    ) {}
  async canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Promise<boolean> {
    return true;
  }
}