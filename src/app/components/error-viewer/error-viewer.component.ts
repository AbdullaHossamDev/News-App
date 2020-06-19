import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-viewer',
  templateUrl: './error-viewer.component.html',
  styleUrls: ['./error-viewer.component.scss']
})
export class ErrorViewerComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ErrorViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close() 
  }

}
