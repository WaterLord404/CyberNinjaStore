import { Injectable } from '@angular/core';
import { OrderDetailsI } from '../interfaces/order-details';
import { ProductI } from '../../product/Interfaces/productI';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CartBadgeService } from 'src/app/core/services/cart-badge.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  url = 'cart';
  // Almacena en localStore los ids
  ordersDetailsLocal: Array<OrderDetailsI>;

  constructor(
    private http: HttpClient,
    private cartBadgeService: CartBadgeService,
    private authService: AuthService,
    private snackBarService: SnackBarService
  ) { }

  /**
  * Obtiene los productos con las imagenes que se encuentran en localstorage
  * @param ProductI
  */
  getCartProduct(ordersDetails: Array<OrderDetailsI>): Observable<any> {
    return this.http.put(this.url, ordersDetails);
  }

  /**
   * Obtiene el carrito del usuario y lo guarda en localstorage sin las imagenes
   */
  getCart(): void {
    this.http.get(this.url).subscribe(
      (res: Array<OrderDetailsI>) => {
        // Suma al localstorage el carrito del usuario
        this.ordersDetailsLocal = JSON.parse(localStorage.getItem('cart'));

        if (this.ordersDetailsLocal === null) {
          this.ordersDetailsLocal = [];
        }

        this.clearOrderDetailsDocuments(res).forEach(element => {
          if (!this.checkAndAddIfExist(element)) {
            this.ordersDetailsLocal.push(element);
          }
        });

        localStorage.setItem('cart', JSON.stringify(this.ordersDetailsLocal));
        this.cartBadgeService.update();
      },
      () => { }
    );
  }

  /**
   * Guarda el carrito en BD
   */
  saveCart(): void {
    this.ordersDetailsLocal = JSON.parse(localStorage.getItem('cart'));

    if (this.ordersDetailsLocal === null) {
      this.ordersDetailsLocal = [];
    }

    this.http.post(this.url, this.ordersDetailsLocal).pipe(finalize(
      () => {
        this.cartBadgeService.clear();
        this.cartBadgeService.update();
        this.authService.logout();
        this.snackBarService.popup(211);
      }
    )).subscribe(
      () => { },
      () => { }
    );
  }

  /**
   * Guarda en localStorage el producto seleccionado
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
      if (element.product.id === orderDetails.product.id &&
        element.colour === orderDetails.colour &&
        element.size === orderDetails.size) {

        element.units = element.units + orderDetails.units;
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

  /**
   * Elimina las imagenes de ordersdetails para no saturar localstorage
   */
  clearOrderDetailsDocuments(ordersDetails: Array<OrderDetailsI>): Array<OrderDetailsI> {
    const ordersDetailsWithoutImg: Array<OrderDetailsI> = JSON.parse(JSON.stringify(ordersDetails));
    ordersDetailsWithoutImg.forEach(element => {
      element.product.documents = null;
    });
    return ordersDetailsWithoutImg;
  }
}
