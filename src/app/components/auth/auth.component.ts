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
        if(data.status == 200){
          this.authServ.snackBar('Please check your mail to sign in', 10000);
        }
      },
      (err) => {
        if(err.status == 409 || err.status == 500){
          this.errServ.showError(err.error.msg)
        }
        else if(err.status == 400){
          this.errServ.showError('Please fill all the requirments!')
        }else{
          console.log('err:',err)
          this.errServ.showError('Please try again later !')
        }
      }
    )
  }

  login(formData){
    this.authServ.login(formData).subscribe(
      (data: any) => {
        if(data.status == 200){
          localStorage.setItem('token', data.body.token);
          localStorage.setItem('id', data.body.id);
          localStorage.setItem('userName', data.body.userName);

          this.dialogRef.close() 
          this.authServ.snackBar('You are logged in');
          this.router.navigate(['/home']);
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
}
