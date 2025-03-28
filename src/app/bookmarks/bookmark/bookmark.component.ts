import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import {
  Bookmark,
  BookmarkGQL,
  Link,
  LinksGQL,
} from '../../../generated-types';
import { AddLinkComponent } from './add-link/add-link.component';
import { Store } from '@ngrx/store';
import { Appstate } from '../../store/app.state';
import { getBookById } from '../state/bookmarks/bookmarks.selector';
import { fetchLinksByUrls } from '../state/links/links.action';
import { setLoadingSpinner } from '../../store/Shared/shared.action';
import { getLinks } from '../state/links/links.selector';
import { getLoading } from '../../store/Shared/shared.selector';
import { MatCardModule } from '@angular/material/card';
import { LoaderComponent } from '../../common/components/loader/loader.component';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss'],
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,

    MatCardModule,
    MatProgressSpinnerModule,
    LoaderComponent,
    NgIf,
    NgFor,
    AsyncPipe,
  ],
  standalone: true,
})
export class BookmarkComponent implements OnInit {
  bookmark$ = this.store.select(getBookById);
  links$ = this.store.select(getLinks);
  isLoading$ = this.store.select(getLoading);

  constructor(
    private readonly dialog: MatDialog,
    private store: Store<Appstate>,
  ) {}

  ngOnInit(): void {
    this.store.select(getBookById).subscribe((bookmark) => {
      let bookmarkData = bookmark as Bookmark;
      if (bookmarkData && bookmarkData.links.length > 0) {
        this.store.dispatch(fetchLinksByUrls({ urls: bookmarkData.links }));
        this.store.dispatch(setLoadingSpinner({ status: true }));
      }
    });
  }

  onAdd(bookmark: Bookmark) {
    this.dialog.open(AddLinkComponent, {
      data: { bookmark: bookmark },
    });
  }

  onLinkClick(url: string) {
    window.open(url, '_blank');
  }
}
