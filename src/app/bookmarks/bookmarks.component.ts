import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateBookmarkComponent } from './create-bookmark/create-bookmark.component';
import { Store } from '@ngrx/store';
import { Appstate } from '../store/app.state';
import { getBookmarks } from './state/bookmarks/bookmarks.selector';
import { fetchBookmarks } from './state/bookmarks/bookmarks.action';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.scss',
})
export class BookmarksComponent implements OnInit {
  bookmarks$ = this.store.select(getBookmarks);
  constructor(
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private store: Store<Appstate>,
  ) {}

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
