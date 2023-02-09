import { Component, HostListener, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/services/auth/shared/shared.service';
import { DarkModeServiceService } from 'src/app/services/darkModeService/dark-mode-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMenuShown : Boolean = false;
  isDarkMode : Boolean;

  public user : any;

  @ViewChild("menu") private menuRef: ElementRef<HTMLElement>;
  @ViewChild("profilePic") private pfpRef: ElementRef<HTMLElement>;

  @HostListener('document:click', ['$event'])
  clickout(event : Event){
    const target = event.target as HTMLElement;
    if(this.pfpRef == undefined) return ;
    if(this.pfpRef.nativeElement.contains(target)) return ;

    if(!this.menuRef.nativeElement.contains(target) && this.isMenuShown){
      this.closeMenu();
    }
  }

  constructor(private sharedService : SharedService, private darkModeService : DarkModeServiceService) { 
  }

  ngOnInit(): void {
    this.sharedService.getCurrentUser().subscribe((resUser)=> this.user = resUser);
    this.darkModeService.getDarkMode().subscribe((bool)=> this.isDarkMode = bool);
  }

  toggleMenu(){
    if(this.isMenuShown){
      this.closeMenu();
      return ;
    }

    document.getElementById("menu").style.display = "flex";
    this.isMenuShown = true;
  }

  closeMenu(){
    document.getElementById("menu").style.display = "none";
    this.isMenuShown = false;
  }

  toggleDarkMode() : void{
    this.darkModeService.toggleDarkMode();
  }

  logout() {
    this.sharedService.logout();
  }

}
