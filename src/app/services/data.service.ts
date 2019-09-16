import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { JwtHelperService} from '@auth0/angular-jwt';

interface User {
       fullName: string;
  readonly exp: number;
  readonly iat:number;
  readonly login:string;
  readonly sub:number;
  
}
const TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public user ;


  constructor(private storage: Storage,
    private helper: JwtHelperService,) { }
 
   setUser(data) {
     this.user = data;
     
  }

    getUser() {
      return new Promise ( res => {
        this.storage.get(TOKEN_KEY).then( token => {
          if (token) {
             this.user =  this.helper.decodeToken(token) ;
             res(this.user);
          }
      })
       

    }) 
  }
}
