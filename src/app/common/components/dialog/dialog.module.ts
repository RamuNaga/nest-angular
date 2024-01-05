import { NgModule } from '@angular/core';
import { DialogComponent } from './dialog.component';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [DialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatToolbarModule,
    MatIconModule,
  ],
  exports: [DialogComponent],
})
export class MyDialogModule {}
