import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  darkMode = new BehaviorSubject<Boolean>(true);

  constructor() { }

  initDarkMode() {
    let darkMode : string | null = localStorage.getItem("darkMode");
    console.log(darkMode)
    if(darkMode == null){
      if(window.matchMedia && window.matchMedia("(prefers-color-scheme:dark)").matches){
        this.darkMode.next(true);
        localStorage.setItem("darkMode", "true");
      }else{
        this.darkMode.next(false);
        localStorage.setItem("darkMode", "false");
      }
      return ;
    }
    this.darkMode.next(darkMode === "true");
  }

  toggleDarkMode() : void{
    if(this.darkMode.value == true){
      this.darkMode.next(false);
      localStorage.setItem("darkMode", "false");
      return ;
    } 
    this.darkMode.next(true);
    localStorage.setItem("darkMode", "true");
  }

  getDarkMode() : BehaviorSubject<Boolean> {
    return this.darkMode;
  }
}
