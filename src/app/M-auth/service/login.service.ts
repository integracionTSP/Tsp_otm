import { Injectable, Output, EventEmitter, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit {
  isEnableMenu:boolean = false;
  private sendState = new Subject<boolean>();
  sendEnviableState =  this.sendState.asObservable();
  constructor() {

   }

   ngOnInit(){
    this.isLogged(false);
   }

   @Output() change: EventEmitter<boolean> = new EventEmitter();
 
  isLogged(state) {
    this.isEnableMenu = state;
    this.sendState.next(state);
    
  }

}
