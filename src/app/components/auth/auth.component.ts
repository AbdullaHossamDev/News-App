import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/services/errorHandler/error-handler.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  @ViewChild('suggest') suggest: ElementRef;

  password;
  suggestedPassword;

  constructor(
    private renderer: Renderer2,
    private authServ: AuthService,
    private errServ: ErrorHandlerService,
    private router: Router,
    private dialogRef: MatDialogRef<AuthComponent>,
    ) { }

  ngOnInit(): void {
  }

  register(formData){
    this.authServ.register(formData).subscribe(
      (data: any) => {
        console.log('data: ', data)
        if(data.status == 200){
          localStorage.setItem('token', data.token);
          localStorage.setItem('id', data.id);
          localStorage.setItem('name', data.name);
          // this.router.navigate(['/home'])

          this.password = undefined;
          this.suggestedPassword = undefined;
          this.dialogRef.close() 
        }
      },
      (err) => {
        if(err.status == 409 || err.status == 500){
          this.errServ.showError(err.error.msg)
        }
        else if(err.status == 400){
          this.errServ.showError('Please fill all the requirments!')
        }else{
          this.errServ.showError('Please try again later !')
        }
      }
    )
  }

  login(formData){
    console.log('formData in login', formData)
    this.authServ.login(formData).subscribe(
      (data: any) => {
        console.log('data: ', data)
        if(data.status == 200){
          localStorage.setItem('token', data.token);
          localStorage.setItem('id', data.id);
          localStorage.setItem('name', data.name);
          // this.router.navigate(['/home'])

          this.dialogRef.close() 
        }
      },
      (err) => {
        if(err.status == 401 || err.status == 500){
          this.errServ.showError(err.error.msg)
        }
        else if(err.status == 400){
          this.errServ.showError('Please fill all the requirments!')
        }else{
          this.errServ.showError('Please try again later !')
        }
      }
    )
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
