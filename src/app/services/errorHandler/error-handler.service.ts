import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorViewerComponent } from 'src/app/components/error-viewer/error-viewer.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private dialog: MatDialog,
  ) { }

  showError(errMSG){
    const dialogRef = this.dialog.open(ErrorViewerComponent, {
      width: '250px',
      data: {
        msg: errMSG
      }
    });
  }
}
