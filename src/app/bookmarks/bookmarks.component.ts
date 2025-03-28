import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { CreateBookmarkComponent } from './create-bookmark/create-bookmark.component';
import { Store } from '@ngrx/store';
import { Appstate } from '../store/app.state';
import { getBookmarks } from './state/bookmarks/bookmarks.selector';
import { fetchBookmarks } from './state/bookmarks/bookmarks.action';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.scss',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    RouterModule,
    NgFor,
    AsyncPipe,
  ],
})
export class BookmarksComponent implements OnInit {
  bookmarks$ = this.store.select(getBookmarks);
  constructor(
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private store: Store<Appstate>,
  ) {}
  // life cycle
  ngOnInit(): void {
    this.store.dispatch(fetchBookmarks());
  }

  onFabClick() {
    this.dialog.open(CreateBookmarkComponent);
  }

  onBookmarkClick(bookmarkId: string) {
    this.router.navigate(['bookmarks/details/', bookmarkId]);
  }
}
