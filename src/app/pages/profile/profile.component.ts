import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user/user.service';
import { SharedService } from 'src/app/services/auth/shared/shared.service'
import { PostService } from 'src/app/services/post/post.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserForm } from 'src/app/models/user-form';
import { FollowService } from 'src/app/services/follow/follow.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public isLoading : Boolean = false;

  public user : userModel;
  public isCurrentUser : boolean = false;

  public isEditing : Boolean;
  public biographyCharCount : number = 0;

  public newPictureB64 : string | ArrayBuffer;
  public newBgB64 : string | ArrayBuffer;

  private newPicture : File;
  private newBg: File;

  profileForm = new FormGroup({
    username : new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
    biography : new FormControl('', [Validators.maxLength(200)]),
    location : new FormControl('', [Validators.maxLength(50)]),
    birthday : new FormControl('')
  })

  constructor(private userService : UserService, private activatedRoute : ActivatedRoute, private router: Router, private sharedService : SharedService,
    private postService : PostService, private followService : FollowService) { }

  ngOnInit(): void {
    this.isEditing = false;

    this.activatedRoute.params.subscribe( (params) => {
      let username = params["username"];
      this.userService.getUserProfile(username).subscribe((newProf)=>{
        this.user = newProf;
        if(this.sharedService.getCurrentUser().value == null || this.sharedService.getCurrentUser().value.username != this.user.username){
          this.isCurrentUser = false;
        }else if(this.user.username == this.sharedService.getCurrentUser().value.username){
          this.isCurrentUser = true;
        }

        this.profileForm.get("username").setValue(this.user.username);
        this.profileForm.get("biography").setValue(this.user.biography);
        this.profileForm.get("location").setValue(this.user.location);

        this.biographyCharCount = this.user.biography.length;

      });        
    })

  }

  editProfile(){
    this.isEditing = this.isEditing ? false : true;
  }

  submitEdit(){
    let userForm = new FormData();
    let editReq = new UserForm();

    if(this.newPicture){
      userForm.append('picture', this.newPicture);
    }

    if(this.newBg){
      userForm.append('background', this.newBg);
    }

    editReq.username = this.profileForm.get("username").value;
    editReq.biography = this.profileForm.get("biography").value;
    editReq.location = this.profileForm.get("location").value;
    editReq.birthday = this.profileForm.get("birthday").value;

    console.log(editReq.birthday)

    userForm.append('jsonString', JSON.stringify(editReq));

    this.userService.editUserProfile(this.user.username, userForm).subscribe({
      next: (newUser)=>{
        this.user = newUser;
        this.sharedService.retrieveUser();
      }
    });
    
    this.editProfile();
  }

  discardEdit() : void {
    this.editProfile();

    this.newBg = null;
    this.newBgB64 = null;

    this.newPicture = null;
    this.newPictureB64 = null;

    this.profileForm.get("username").setValue(this.user.username);
    this.profileForm.get("biography").setValue(this.user.biography);
    this.profileForm.get("location").setValue(this.user.location);

  }

  onBackgroundChange(event : any){
    this.newBg = event.target.files[0];
    
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.newBgB64 = reader.result;
    }

  }

  onProfilePicChange(event : any){
    this.newPicture = event.target.files[0];
    
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.newPictureB64 = reader.result;
    }
  }

  handleBioInput(event : Event) : void {
    this.biographyCharCount = this.profileForm.get("biography").value.length;
  }

  followUser() : void {
    console.log(this.user.username)
    this.followService.followUser(this.user.username).subscribe({
      next: ()=> { 
        if(this.user.followed){
          this.user.followers = this.user.followers - 1;
        }else{
          this.user.followers = this.user.followers + 1;
        }

        this.user.followed = this.user.followed ? false : true;
      },
    })
  }

}
