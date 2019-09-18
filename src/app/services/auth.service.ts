import { Injectable, Input } from '@angular/core';
import { Platform, AlertController, LoadingController} from '@ionic/angular';
import { HttpClient} from '@angular/common/http';
import { JwtHelperService} from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { environment} from '../environments/environment';
import { tap, catchError,finalize } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import {DataService} from './data.service';
import { decode } from 'punycode';
import { load } from '@angular/core/src/render3';



const TOKEN_KEY = 'access_token';


interface RespWithToken {
  message : boolean,
  token: string
};

@Injectable({
  providedIn: 'root'
})
 

export class AuthService {

  public  inetrnet:boolean;
    url = environment.url;
    user = null;
    authenticationState = new BehaviorSubject(false);

  constructor(
    private loadinCtrl: LoadingController,
    private http: HttpClient, 
    private dataService: DataService,
    private helper: JwtHelperService,
    private storage: Storage, private plt: Platform, private alertController: AlertController) {
      this.plt.ready().then(() => {
        this.checkToken();
      })
     }

    

      checkToken(){
        this.storage.get(TOKEN_KEY).then( token => {
           if (token) {
            let decoded = this.helper.decodeToken(token);
            let isExpired = this.helper.isTokenExpired(token);

            if (!isExpired) {
              this.user = decoded;
              this.authenticationState.next(true);
            } else {
              this.storage.remove(TOKEN_KEY);
            }
          }
        });
      }


      register(credentials) {
         return this.http.post(`${this.url}/api/register`, credentials).pipe(
           catchError( e => {
             this.showAlert(e.error.msg);
              throw new Error(e);
            })
           );
         
      }
 
       login(credentials) {
      
     return this.http.post(`${this.url}/api/login`, credentials).pipe(
          tap((res:RespWithToken) => {
             this.storage.set(TOKEN_KEY, res.token);
             this.user = this.helper.decodeToken(res.token);
             this.dataService.setUser(this.user);

             this.authenticationState.next(true);
          }), 
          catchError( e => {
            this.showAlert(e.error.msg);
             throw new Error(e);
           })
          ).subscribe();
     }
      
   
     
     logout() {
       this.storage.remove(TOKEN_KEY).then(() => {
         this.authenticationState.next(false);
       })
     }

     getSpecialData() {
        return this.http.get(`${this.url}/api/special`).pipe(
          catchError( e => {
            let status = e.status;
            if (status === 401) {
              this.showAlert('Ви не зареєстровані тут');
              this.logout();
            }
            throw new Error(e)
          })
        )
     }

     isAuthenticated() {
       let auth; 
       this.authenticationState.subscribe(a => {
         auth = a
       });
      
       return auth; 
     }

    
      showAlert(msg) {
        let alert = this.alertController.create({
           message: msg,
           header: 'Ошибка',
           buttons: ['OK']
        });
        alert.then(alert => alert.present());
      }

      
    }
