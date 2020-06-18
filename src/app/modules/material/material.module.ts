import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select'
import { MatMenuModule } from '@angular/material/menu'
import { MatNativeDateModule } from '@angular/material/core';
import {ClipboardModule} from '@angular/cdk/clipboard';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatSelectModule, 
    MatMenuModule,
    MatNativeDateModule,
    ClipboardModule
  ],
  exports:[
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatSelectModule, 
    MatMenuModule,
    MatNativeDateModule,
    ClipboardModule
  ]
})
export class MaterialModule { }
