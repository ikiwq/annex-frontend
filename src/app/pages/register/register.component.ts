import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterRequest } from 'src/app/models/auth.models';
import { SharedService } from 'src/app/services/auth/shared/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerRequest : RegisterRequest;

  isLoading : boolean = false;

  public errorMessage: string = null;
  public successMessage : string = null;

  public showPassword : boolean = false;
  public usernameAvaible : boolean = true;

  registerForm : FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(45)]),
    username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    password: new FormControl('', Validators.required)
  });

  constructor(private sharedService : SharedService) { 
    this.registerRequest= new RegisterRequest();

    this.registerForm.get("username").valueChanges.subscribe(username => {
      if(username.length <= 5) return ;
      this.sharedService.doesUserExist(username).subscribe(
        data => {
          this.usernameAvaible = data == true ? false : true;
        }
      )
    })
  }

  ngOnInit(): void {

  }

  register(){
    if(this.isLoading == true) return ;
    
    this.isLoading = true;
    
    this.errorMessage = null;
    this.successMessage = null;
    
    this.registerRequest.email =  this.registerForm.get('email').value;
    this.registerRequest.username =  this.registerForm.get('username').value;
    this.registerRequest.password =  this.registerForm.get('password').value;

    this.sharedService.register(this.registerRequest).subscribe({
      next: (data) => { this.successMessage = "User registered. Please log in!"; this.isLoading = false;},
      error: (err) => { this.errorMessage = err.message; this.isLoading = false;},
    });
  }

  togglePassword(){
    this.showPassword = !this.showPassword;
  }

}
