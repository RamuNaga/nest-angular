import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, filter, merge, tap } from 'rxjs';
import { Appstate } from './store/app.state';
import {
  getDialog,
  getErrorMessage,
  getLoading,
} from './store/Shared/shared.selector';
import { openCommonDialog } from './common/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MessageModel } from './model/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'NestAngular Frontend Application121';

  showDialog$ = this.store.select(getDialog);
  errorMessage$ = this.store.select<MessageModel>(getErrorMessage);
  showLoading$ = this.store.select(getLoading);
  showDialogMessage = combineLatest([this.showDialog$, this.errorMessage$])
    .pipe(
      tap(([showDialog, errorMessage]) => {
        if (showDialog && errorMessage.message != '') {
          this.loadDialog(errorMessage);
        }
      }),
    )
    .subscribe();

  constructor(
    private store: Store<Appstate>,
    private dialog: MatDialog,
  ) {}

  loadDialog(msgModel: MessageModel) {
    openCommonDialog(this.dialog, msgModel)
      .pipe(filter((val) => !!val))
      .subscribe((val) => console.log('new value:', val));
  }

  ngOnDestroy() {
    this.showDialogMessage.unsubscribe();
  }
}
