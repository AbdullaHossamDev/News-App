import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  @ViewChild('suggest') suggest: ElementRef;

  userName;
  password;
  email;
  birthDate;

  suggestedPassword;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  register(formData){
    this.userName = undefined;
    this.email = undefined;
    this.password = undefined;
    this.birthDate = undefined;
  }

  login(formData){
    
  }

  selectSuggest(){
    this.password = this.suggestedPassword;
    this.renderer.setStyle(this.suggest.nativeElement, 'display', 'none');
  }

  showElm() {
    this.suggestedPassword = this.suggestedPassword ? this.suggestedPassword :  this.makeRandom();
    this.renderer.setStyle(this.suggest.nativeElement, 'display', 'block');
  }

  makeRandom() {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890/[]\=-)(*&^%$#@!~0123456789";
    const lengthOfCode = 10;
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

}
