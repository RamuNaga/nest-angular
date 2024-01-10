import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];
@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, MatTabsModule, RouterModule.forChild(routes)],
})
export class HomeModule {}
