import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../auth/auth.component';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    public authServ: AuthService
  ) { }

  ngOnInit(): void {
  }

  login(){
    const dialogRef = this.dialog.open(AuthComponent, {
      width: '500px',
      // height: '650px',
      data: {},
      panelClass: 'custom-modalbox'
    });
  }

  logout(){
    this.authServ.logout();
  }

}
