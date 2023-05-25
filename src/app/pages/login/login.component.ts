import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/auth/shared/shared.service';
import { LoginRequest } from 'src/app/models/auth.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading : boolean = false;

  private loginRequest : LoginRequest;

  public showPassword : boolean = false;

  errorMessage : string = null;

  loginForm : FormGroup = new FormGroup({
    usercred : new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private sharedService : SharedService, private router : Router) {
    this.loginRequest = new LoginRequest();
  }

  ngOnInit(): void {
  }

  login(){
    if(this.isLoading) return ;

    if(!this.loginForm.valid){
      return ;
    }
    
    this.errorMessage = null;
    
    this.loginRequest.usercred = this.loginForm.get('usercred').value;
    this.loginRequest.password = this.loginForm.get('password').value;

    this.sharedService.login(this.loginRequest).subscribe({
      next: (data)=>{ this.sharedService.retrieveUser(); this.router.navigate([`/`]); this.isLoading = false;},
      error: (err) => {this.errorMessage = err.message; this.isLoading = false;}
    })

  }

  togglePassword(){
    this.showPassword = !this.showPassword;
  }
}
