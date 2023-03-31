import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Route, Router, RouterEvent } from '@angular/router';
import { BehaviorSubject, every } from 'rxjs';
import { userModel } from 'src/app/models/user-model';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @ViewChild("searchMenu") searchMenu : ElementRef<HTMLElement>;
  @ViewChild("searchInput") searchInput : ElementRef<HTMLElement>;

  isListOpened : boolean = false;

  @HostListener('document:click', ['$event'])
  clickout(event : Event){
    const target = event.target as HTMLElement;

    if(!this.searchMenu.nativeElement.contains(target) && !this.searchInput.nativeElement.contains(target) && this.isListOpened){
      this.hideList();
    }
  }

  public UserList = new BehaviorSubject<userModel[]>([]);

  public isLoading : Boolean = false;

  public inputGroup = new FormGroup({
    mainInput: new FormControl('', [Validators.minLength(0), Validators.maxLength(32)])
  })

  constructor(private searchService: SearchService, private router : Router, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.searchService.getLoadingUsers().subscribe((bool)=> this.isLoading = bool);
    this.activatedRoute.params.subscribe((params)=>{
      console.log(params);
    })
  }

  hideList(){
    this.searchMenu.nativeElement.style.display = "none";
    this.isListOpened = false;
  }

  showList(){
    this.searchMenu.nativeElement.style.display = "flex";
    this.isListOpened = true;
  }

  searchUser(e : Event){
    let search = this.inputGroup.get('mainInput').value;
    console.log(search)
    if(search.length <=0 ) return ;

    let date = new Date().toUTCString();

    this.searchService.retrieveUsersByNick(search, date);
    this.searchService.getUsersByNick().subscribe((users)=> this.UserList.next(users))
  }

  goToSearchPage(){
    let search = this.inputGroup.get('mainInput').value;
    this.router.navigate([`/search/${search}`])
  }

}
