import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { userModel } from 'src/app/models/user.models';
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

  constructor(private searchService: SearchService, private router : Router) { }

  ngOnInit(): void {
    this.searchService.getLoadingUsers().subscribe((bool)=> this.isLoading = bool);
    this.searchService.getCurrentSearch().subscribe((text)=>this.inputGroup.get("mainInput").setValue(text))
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
    if(search.length <=0 ) return ;

    this.searchService.retrieveUsersByNick(search);
    this.searchService.getUsersByNick().subscribe((users)=> this.UserList.next(users))
  }

  goToSearchPage(){
    let search = this.inputGroup.get('mainInput').value;
    this.router.navigate([`/search/${search}`])
  }

}
