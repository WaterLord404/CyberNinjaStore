import { Injectable } from '@angular/core';
import { ProductI } from '../modules/product/Interfaces/productI';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartProductsLocal: Array<ProductI> = [];

  constructor() { }

  /**
   * Guarda en localStorage los productos del carrito
   * @param item
   */
  addProductToCart(item: ProductI): void {
    this.cartProductsLocal = [];
    const savedProducts: Array<ProductI> = JSON.parse(localStorage.getItem('cart'));

    // Comprueba si existe un primer producto, si no recorre la lista y
    // añade cada producto a la nueva lista
    if (savedProducts == null) {
      this.cartProductsLocal.push(item);
    } else {
      savedProducts.forEach(element => {
        this.cartProductsLocal.push(element);
      });
      this.cartProductsLocal.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(this.cartProductsLocal));
  }

  /**
   * Borra un producto del carrito y si no tiene productos se elimina de localstorage
   * @param item: ProductI
   */
  deleteThisItem(item: ProductI, cartProducts: Array<ProductI>): Array<ProductI> {
    cartProducts.forEach(element => {
      if (element === item) {
        const i = cartProducts.indexOf(element);
        cartProducts.splice(i, 1);
      }
    });
    localStorage.setItem('cart', JSON.stringify(cartProducts));

    if (cartProducts.length === 0) {
      localStorage.removeItem('cart');
    }

    return cartProducts;
  }



}
