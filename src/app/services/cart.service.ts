import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetailsI } from '../interfaces/order-details';
import { ProductI } from '../modules/product/Interfaces/productI';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // Almacena en localStore los ids
  ordersDetailsLocal: Array<OrderDetailsI>;

  constructor() { }

  /**
   * Guarda en localStorage orders details
   * @param itemId
   */
  addProductToCart(item: ProductI): void {
    this.ordersDetailsLocal = JSON.parse(localStorage.getItem('cart'));

    if (this.ordersDetailsLocal == null) { this.ordersDetailsLocal = []; }

    if (!this.checkAndAddIfExist(item)) {
      // Clona el objeto sin img
      const itemWithoutImg = Object.assign({}, item);
      itemWithoutImg.documents = null;

      this.ordersDetailsLocal.push({
        units: 1,
        color: 'test',
        size: 'test',
        product: itemWithoutImg
      });
    }

    localStorage.setItem('cart', JSON.stringify(this.ordersDetailsLocal));
  }

  /**
   * Comprueba si existe el item en el local storage, si existe suma 1 a units
   * @param item
   * @returns boolean
   */
  private checkAndAddIfExist(item: ProductI): boolean {
    let updated = false;
    this.ordersDetailsLocal.forEach(element => {
      if (element.product.id === item.id) {
        element.units = element.units + 1;
        updated = true;
      }
    });
    return updated;
  }

  /**
   * Borra un producto de la vista de carrito y del local storage
   * @param item: ProductI
   * @returns List<ProductI>
   */
  deleteThisItem(item: ProductI, cartProducts: Array<OrderDetailsI>): Array<OrderDetailsI> {
    this.ordersDetailsLocal = JSON.parse(localStorage.getItem('cart'));

    // Recorre los productos, si el id coincide con el seleccionado lo elimina
    cartProducts.forEach(element => {
      if (element.product === item) {
        const i = cartProducts.indexOf(element);
        cartProducts.splice(i, 1);
        this.ordersDetailsLocal.splice(i, 1);
      }
    });

    localStorage.setItem('cart', JSON.stringify(this.ordersDetailsLocal));

    return cartProducts;
  }

}
