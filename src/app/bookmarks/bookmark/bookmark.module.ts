import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookmarkComponent } from './bookmark.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddLinkModule } from './add-link/add-link.module';
import { LoaderComponent } from '../../common/components/loader/loader.component';

@NgModule({
  declarations: [BookmarkComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    AddLinkModule,
    MatCardModule,
    MatProgressSpinnerModule,
    LoaderComponent,
  ],
  exports: [BookmarkComponent],
})
export class BookmarkModule {}
