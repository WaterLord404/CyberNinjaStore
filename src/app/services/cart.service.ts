import { Injectable } from '@angular/core';
import { ProductI } from '../modules/product/Interfaces/productI';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  products: Array<ProductI> = [];

  constructor() { }

  /**
   * Guarda en localStorage los productos del carrito
   * @param item
   */
  addProductToCart(item: ProductI): void {
    this.products = [];
    // Obtiene los productos existentes del localStorage
    const savedProducts: Array<ProductI> = JSON.parse(localStorage.getItem('cart'));

    // Comprueba si existe un primer producto, si no recorre la lista y
    // añade cada producto a la nueva lista
    if (savedProducts == null) {
      this.products.push(item);
    } else {
      savedProducts.forEach(element => {
        this.products.push(element);
      });
      this.products.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(this.products));
  }
}
