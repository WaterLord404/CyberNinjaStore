import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductI } from '../modules/product/Interfaces/productI';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // Almacena en localStore los ids
  cartIdsProductsLocal: Array<number>;

  constructor() { }

  /**
   * Guarda en localStorage los ids de los items
   * @param itemId
   */
  addProductToCart(itemId: number): void {
    this.cartIdsProductsLocal = JSON.parse(localStorage.getItem('cart'));

    if (this.cartIdsProductsLocal == null) { this.cartIdsProductsLocal = []; }
    this.cartIdsProductsLocal.push(itemId);

    localStorage.setItem('cart', JSON.stringify(this.cartIdsProductsLocal));
  }

  /**
   * Borra un producto de la vista de carrito, del local storage y si no
   * tiene productos se elimina de localstorage
   * @param item: ProductI
   * @returns List<ProductI>
   */
  deleteThisItem(item: ProductI, cartProducts: Array<ProductI>): Array<ProductI> {
    // Recorre los productos, si el id coincide con el seleccionado lo elimina
    cartProducts.forEach(element => {
      if (element === item) {
        const i = cartProducts.indexOf(element);
        cartProducts.splice(i, 1);
      }
    });

    const productsIds = this.generateProductsIds(cartProducts);
    // Guarda los ids de nuevo
    localStorage.setItem('cart', JSON.stringify(productsIds));

    return cartProducts;
  }

  // Transforma la lista de producsto a una lista de ids
  private generateProductsIds(cartProducts: Array<ProductI>): Array<number> {
    const numbers: Array<number> = [];
    cartProducts.forEach(element => {
      numbers.push(element.id);
    });
    return numbers;
  }
}
