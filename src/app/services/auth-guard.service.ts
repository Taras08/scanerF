import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from './auth.service';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor( private auth: AuthService) { }

  canActivate(): Observable<boolean> | boolean {
    return this.auth.isAuthenticated();
  }

}
