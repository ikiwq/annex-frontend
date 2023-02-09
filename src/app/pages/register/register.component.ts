import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterRequestPayload } from '../../models/register-request.payload';
import { SharedService } from 'src/app/services/auth/shared/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerRequestPayload : RegisterRequestPayload;

  isLoading : boolean = false;

  public errorMessage: string = null;
  public successMessage : string = null;

  public showPassword : boolean = false;
  public usernameAvaible : boolean = true;

  registerForm : FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    password: new FormControl('', Validators.required)
  });

  constructor(private sharedService : SharedService) { 
    this.registerRequestPayload = {
      email: '',
      username: '',
      password: '',
    }

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
    
    this.registerRequestPayload.email =  this.registerForm.get('email').value;
    this.registerRequestPayload.username =  this.registerForm.get('username').value;
    this.registerRequestPayload.password =  this.registerForm.get('password').value;

    this.sharedService.register(this.registerRequestPayload).subscribe({
      next: (data) => { this.successMessage = "User registered. Please log in!"; this.isLoading = false;},
      error: (err) => { this.errorMessage = err.message; this.isLoading = false;},
    });
  }

  togglePassword(){
    this.showPassword = !this.showPassword;
  }

}
