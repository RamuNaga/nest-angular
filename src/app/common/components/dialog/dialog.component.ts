import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogConfig,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Appstate } from '../../../store/app.state';
import { getErrorMessage } from '../../../store/Shared/shared.selector';
import { MatButtonModule } from '@angular/material/button';
import { MessageModel } from '../../../model/message';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatIconModule, MatToolbarModule],
})
export class DialogComponent {
  message: string;

  // enterAnimationDuration: string = '3000ms';
  // exitAnimationDuration: string = '1500ms';

  constructor(
    @Optional() private dialogRef: MatDialogRef<DialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: MessageModel,
  ) {
    this.message = this.data.message;
  }

  onClose() {
    this.dialogRef.close();
  }
}

export function openCommonDialog(
  dialog: MatDialog,
  messageModel: MessageModel,
) {
  const config = new MatDialogConfig();
  config.disableClose = true;
  config.autoFocus = true;
  config.panelClass = 'modal-panel';
  config.backdropClass = 'backdrop-modal-panel';
  config.enterAnimationDuration = '0ms';
  config.exitAnimationDuration = '1500ms';
  config.data = {
    ...messageModel,
  };

  const dialogRef = dialog.open(DialogComponent, config);
  return dialogRef.afterClosed();
}
