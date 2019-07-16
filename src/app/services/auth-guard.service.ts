import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor( private auth: AuthService) { }

  canActivate(): boolean {
    return this.auth.isAuthenticated();
  }

}
