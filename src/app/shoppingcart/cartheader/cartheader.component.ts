import { Component, computed, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CartService } from '../services/cart.service';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cartheader',
  imports: [MatToolbarModule, RouterModule, NgIf],
  templateUrl: './cartheader.component.html',
  styleUrl: './cartheader.component.scss',
  standalone: true,
})
export class CartheaderComponent {
  cartService = inject(CartService);

  cartCount = computed(() =>
    this.cartService.cartItems().reduce((acc, item) => acc + item.quantity, 0),
  );
}
