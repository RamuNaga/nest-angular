import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader',
  template: `<mat-spinner class="spinner"></mat-spinner>`,
  styleUrls: ['./loader.component.scss'],
  imports: [MatProgressSpinnerModule],
  standalone: true,
})
export class LoaderComponent {}
