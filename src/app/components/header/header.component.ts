import { Component, HostListener, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SharedService } from 'src/app/services/auth/shared/shared.service';
import { DarkModeService } from 'src/app/services/dark-mode-service/dark-mode.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isMenuShown : Boolean = false;
  isDarkMode : Boolean;

  isInHome : Boolean = true;

  public user : any;

  @Input() public seeLogo : boolean = true;
  @Input() public seeBack : boolean = false;
   
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

  constructor(private sharedService : SharedService, private route: ActivatedRoute, private darkModeService : DarkModeService, private router : Router,
    private location : Location) { 
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        const eventUrl =  event.urlAfterRedirects;
        if(eventUrl != "/"){
          this.seeBack = true;
          this.seeLogo = false;
        }else{
          this.seeLogo = true;
          this.seeBack = false;
        }
      }
    })
  }

  ngOnInit(): void {
    this.sharedService.getCurrentUser().subscribe((resUser)=> this.user = resUser);
    this.darkModeService.getDarkMode().subscribe((bool)=> this.isDarkMode = bool);
  }

  navigateBack(){
    this.location.back();
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
