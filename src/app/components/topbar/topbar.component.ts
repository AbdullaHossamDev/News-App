import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../auth/auth.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
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

}
