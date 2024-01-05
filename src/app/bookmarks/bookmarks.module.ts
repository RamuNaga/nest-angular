import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookmarksComponent } from './bookmarks.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { CreateBookmarkModule } from './create-bookmark/create-bookmark.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: BookmarksComponent,
    children: [],
  },
];

@NgModule({
  declarations: [BookmarksComponent],
  imports: [
    CommonModule,
    CreateBookmarkModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    RouterModule.forChild(routes),
  ],
  exports: [BookmarksComponent],
})
export class BookmarksModule {}
