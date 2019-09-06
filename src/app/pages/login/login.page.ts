import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentialsForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['',[Validators.required, Validators.minLength(4)]]
      
    });

    
  }
 
  
  onSubmit() {
    this.authService.login(this.credentialsForm.value).subscribe();
  }
 

  register() {
    this.authService.register(this.credentialsForm.value).subscribe( res => {
      this.authService.login(this.credentialsForm.value).subscribe();
    });
  }
}
