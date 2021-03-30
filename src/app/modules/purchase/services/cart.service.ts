import { Injectable } from '@angular/core';
import { OrderDetailsI } from '../interfaces/order-details';
import { ProductI } from '../../product/Interfaces/productI';

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
  addProductToCart(orderDetails: OrderDetailsI): void {
    this.ordersDetailsLocal = JSON.parse(localStorage.getItem('cart'));

    if (this.ordersDetailsLocal == null) { this.ordersDetailsLocal = []; }

    // Si no existe crea un order details nuevo
    if (!this.checkAndAddIfExist(orderDetails)) {
      this.ordersDetailsLocal.push(orderDetails);
    }

    localStorage.setItem('cart', JSON.stringify(this.ordersDetailsLocal));
  }

  /**
   * Comprueba si existe el order detail en el local storage, si existe suma 1 a units
   * @param item
   * @returns boolean
   */
  private checkAndAddIfExist(orderDetails: OrderDetailsI): boolean {
    let updated = false;
    this.ordersDetailsLocal.forEach(element => {
      if (element.colour === orderDetails.colour &&
        element.size === orderDetails.size) {

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
