import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Platform, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentialsForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
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
 
 

  async onSubmit() {
 let loading = await this.loadinCtrl.create();
 await loading.present();
  await   this.authService.login(this.credentialsForm.value);
  loading.dismiss();
  }
   


  register() {
    this.authService.register(this.credentialsForm.value).subscribe( res => {
      this.authService.login(this.credentialsForm.value);
    });
  }
}
