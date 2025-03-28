import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [MatTabsModule],
  standalone: true,
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {}
}
