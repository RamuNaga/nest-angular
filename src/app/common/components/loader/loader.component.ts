import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  selector: 'app-loader',
  template: `<mat-spinner class="spinner"></mat-spinner>`,
  styleUrls: ['./loader.component.scss'],
  imports: [MatProgressSpinnerModule],
})
export class LoaderComponent {}
