import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Bookmark, BookmarksGQL } from '../../generated-types';
import { Router } from '@angular/router';
import { CreateBookmarkComponent } from './create-bookmark/create-bookmark.component';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { Appstate } from '../store/app.state';
import { getBookmarks } from './state/bookmarks.selector';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.scss',
})
export class BookmarksComponent implements OnInit {
  bookmarks$: Observable<Bookmark[]>;

  constructor(
    private readonly dialog: MatDialog,
    private readonly bookmarksGql: BookmarksGQL,
    private readonly router: Router,
    private store: Store<Appstate>,
  ) {}

  ngOnInit(): void {
    // this.bookmarks$ = this.bookmarksGql.watch().valueChanges.pipe(
    //   map((result) => {
    //     return result.data.bookmarks;
    //   }),
    // );

    this.bookmarks$ = this.store.select(getBookmarks);
  }

  onFabClick() {
    this.dialog.open(CreateBookmarkComponent);
  }

  onBookmarkClick(bookmarkId: string) {
    this.router.navigate(['/bookmarks', bookmarkId]);
  }
}
