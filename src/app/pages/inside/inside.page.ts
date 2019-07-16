import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-inside',
  templateUrl: './inside.page.html',
  styleUrls: ['./inside.page.scss'],
})
export class InsidePage implements OnInit {
  data = '';
  constructor( private authService: AuthService, private storage: Storage, private toastController: ToastController
  ) { }

  ngOnInit() {
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
    //test
    this.storage.remove('access_token');
    
    let toast = this.toastController.create({
        message: 'JWT ',
        duration: 3000
    });
    toast.then(toast => toast.present());
  }
}
