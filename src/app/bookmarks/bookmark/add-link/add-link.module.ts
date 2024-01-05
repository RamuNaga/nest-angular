import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddLinkComponent } from './add-link.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddLinkComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class AddLinkModule {}
