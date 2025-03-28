import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-card',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  standalone: true,
})
export class ProductCardComponent {
  @Input({ required: true })
  product: Product;

  // @Input({ required: true })
  // cardIndex: number;

  @Output('productSelected')
  productEmitter = new EventEmitter<Product>();

  onProductViewed() {
    this.productEmitter.emit(this.product);
  }
}
