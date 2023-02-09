import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/auth/shared/shared.service';
import { LoginRequestPayload } from '../../models/login-request.payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading : boolean = false;

  private loginRequestPayload : LoginRequestPayload;

  public showPassword : boolean = false;

  errorMessage : string = null;

  loginForm : FormGroup = new FormGroup({
    usercred : new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private sharedService : SharedService, private router : Router) {
    this.loginRequestPayload = {
      usercred : '',
      password: '',
    }
  }

  ngOnInit(): void {
  }

  login(){
    if(this.isLoading) return ;

    if(!this.loginForm.valid){
      return ;
    }
    
    this.errorMessage = null;
    
    this.loginRequestPayload.usercred = this.loginForm.get('usercred').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;

    this.sharedService.login(this.loginRequestPayload).subscribe({
      next: (data)=>{ this.sharedService.retrieveUser(); this.router.navigate([`/`]); this.isLoading = false;},
      error: (err) => {console.log(err.message) ;this.errorMessage = err.message; this.isLoading = false;}
    })

  }

  togglePassword(){
    this.showPassword = !this.showPassword;
  }
}
