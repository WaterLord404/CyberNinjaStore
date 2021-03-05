import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductI } from '../modules/product/Interfaces/productI';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartProductsLocal: Array<ProductI>;

  constructor() { }

  /**
   * Guarda en localStorage los ids de los items
   * @param itemId
   */
  addProductToCart(item: ProductI): void {
    const newProduct: ProductI = Object.assign({}, item);
    newProduct.documents = null;

    this.cartProductsLocal = JSON.parse(localStorage.getItem('cart'));

    if (this.cartProductsLocal == null) { this.cartProductsLocal = []; }
    this.cartProductsLocal.push(newProduct);

    localStorage.setItem('cart', JSON.stringify(this.cartProductsLocal));
  }

  /**
   * Borra un producto de la vista de carrito, del local storage y si no
   * tiene productos se elimina de localstorage
   * @param item: ProductI
   */
  deleteThisItem(item: ProductI, cartProducts: Array<ProductI>): Array<ProductI> {
    // Recorre los productos, si el id coincide con el seleccionado lo elimina

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
