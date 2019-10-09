import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Storage, IonicStorageModule} from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router';
import {DataService} from '../../services/data.service';
import { Observable } from 'rxjs';
import {PointService} from './points/point.service';
import * as user from './user';
@Component({  
  selector: 'app-inside',
  templateUrl: './inside.page.html',
  styleUrls: ['./inside.page.scss'],
})
 
export class InsidePage implements OnInit {
  data = '';
  user:any = { };
  
domloading: boolean = true;

  constructor( private authService: AuthService,
    private pointService: PointService,
    private router:Router,
    private dataService: DataService,
    private storage: Storage,
    private toastController: ToastController
  ) { }


  
  ngOnInit() {
    this.dataService.getUser().then( res =>
       { this.user = res;
      user.user["login"] = this.user.login;
     }
    );
    
  }

   getPoint() {
    this.domloading = false;
    this.pointService.setPoint(user.user).then(
        rez =>{ this.router.navigate(['inside/point']),
        this.domloading = true;
      } 
    )
    this.pointService.setPrice();
  }
    getDocument() {
      this.domloading = false;
      this.router.navigate(['inside/documents']),
      this.domloading = true;  
    }
  
 loadSpecialInfo() {
    this.authService.getSpecialData().subscribe( res => {
       this.data = res['msg'];
    })
 }
  
  logout() {
   this.authService.logout();
  }

 clearToken() {
   this.storage.remove('access_token');
  
   let toast = this.toastController.create({
       message: 'JWT ',
       duration: 3000
   });
   toast.then(toast => toast.present());
 }
}
