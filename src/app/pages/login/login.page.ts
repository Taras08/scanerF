import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient } from '@angular/common/http';
import {Observable, from} from 'rxjs';
import { Http ,Response ,Headers, RequestOptions} from '@angular/http';

import { Platform, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ttt: Observable<any> ;
  films: Observable<any>;

  credentialsForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private nativeHttp: HTTP,
    private http: HttpClient,
    private angularHttp: Http,
    private plt: Platform,
    private loadinCtrl: LoadingController,
     private authService: AuthService) { 
       
     }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['',[Validators.required, Validators.minLength(4)]]
    
      
    });

  }
 
 

  onSubmit() {
    this.authService.login(this.credentialsForm.value);
  }
 


  register() {
    this.authService.register(this.credentialsForm.value).subscribe( res => {
      this.authService.login(this.credentialsForm.value);
    });
  }
}
