import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-observer',
  templateUrl: './observer.component.html',
  styleUrls: ['./observer.component.scss']
})
export class ObserverComponent implements OnInit {

  @Output() inView = new EventEmitter();
  @ViewChild('observer', {static: false}) private observer: ElementRef<HTMLDivElement>;

  startPos = 0;
  currentPos = 0;

  @HostListener('window:scroll', ['$event'])
  isScrolledIntoView(event : any){
    if (this.observer){

      const rect = this.observer.nativeElement.getBoundingClientRect();
      const topShown = rect.top >= 0;
      const bottomShown = rect.bottom <= window.innerHeight;

      if(topShown && bottomShown){
        this.inView.emit();
      }
    }
  }


  constructor() { }

  ngOnInit(): void {
  }

}
