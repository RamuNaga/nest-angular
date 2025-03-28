import { Component, OnInit } from '@angular/core';
import { BookmarksDocument, CreateBookmarkGQL } from '../../../generated-types';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-create-bookmark',
  templateUrl: './create-bookmark.component.html',
  styleUrl: './create-bookmark.component.scss',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgIf,
  ],
})
export class CreateBookmarkComponent implements OnInit {
  bookmarkName = new FormControl('', [Validators.required]);

  constructor(
    private readonly createBookmarkGql: CreateBookmarkGQL,
    private readonly dialogRef: MatDialogRef<CreateBookmarkComponent>,
  ) {}

  ngOnInit(): void {}

  getBookmarkNameError() {
    if (this.bookmarkName.hasError('required')) {
      return 'You must enter a value.';
    }
    return '';
  }

  createBookmark() {
    this.createBookmarkGql
      .mutate(
        {
          createBookmarkData: { name: this.bookmarkName.value || '' },
        },
        {
          refetchQueries: [
            {
              query: BookmarksDocument,
            },
          ],
        },
      )
      .subscribe(() => {
        this.dialogRef.close();
      });
  }
}
