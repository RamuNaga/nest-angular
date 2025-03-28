import { Component, Inject } from '@angular/core';
import {
  Bookmark,
  BookmarkDocument,
  UpdateBookmarkGQL,
} from '../../../../generated-types';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatError,
  MatFormField,
  MatFormFieldControl,
  MatLabel,
} from '@angular/material/form-field';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-link',
  templateUrl: './add-link.component.html',
  styleUrl: './add-link.component.scss',
  imports: [
    MatFormField,
    MatError,
    ReactiveFormsModule,
    MatLabel,
    FormsModule,
    NgIf,
  ],
  standalone: true,
})
export class AddLinkComponent {
  link = new FormControl('', Validators.required);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly data: { bookmark: Bookmark },
    private readonly dialogRef: MatDialogRef<AddLinkComponent>,
    private readonly updateBookmarkGQL: UpdateBookmarkGQL,
  ) {}

  getLinkError() {
    if (this.link.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  addLink() {
    this.updateBookmarkGQL
      .mutate(
        {
          updateBookmarkData: {
            _id: this.data.bookmark._id,
            links: [...this.data.bookmark.links, this.link.value || ''],
          },
        },
        {
          refetchQueries: [
            {
              query: BookmarkDocument,
              variables: { _id: this.data.bookmark._id },
            },
          ],
        },
      )
      .subscribe(() => {
        this.dialogRef.close();
      });
  }
}
