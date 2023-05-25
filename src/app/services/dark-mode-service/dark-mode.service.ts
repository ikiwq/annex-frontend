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
    if(darkMode == null){
      if(window.matchMedia && window.matchMedia("(prefers-color-scheme:dark)").matches){
        this.darkMode.next(true);
        document.documentElement.classList.add("dark");
        localStorage.setItem("darkMode", "true");
      }else{
        this.darkMode.next(false);
        document.documentElement.classList.add("light");
        localStorage.setItem("darkMode", "false");
      }
      return ;
    }
    document.documentElement.classList.add("dark");
    this.darkMode.next(darkMode === "true");
  }

  toggleDarkMode() : void{
    document.documentElement.classList.toggle("light");
    document.documentElement.classList.toggle("dark");
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
