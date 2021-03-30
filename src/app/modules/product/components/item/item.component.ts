import { animate, style, transition, trigger } from '@angular/animations';
import { Location } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { DocumentService } from 'src/app/core/services/document.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { CartBadgeService } from 'src/app/core/services/cart-badge.service';
import { CartService } from 'src/app/modules/purchase/services/cart.service';
import { ProductI } from '../../Interfaces/productI';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiscountI } from '../../Interfaces/discount';
import { DiscountService } from 'src/app/modules/purchase/services/discount.service';
import { OrderDetailsI } from 'src/app/modules/purchase/interfaces/order-details';

@Component({
  selector: 'app-product',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('500ms ease-in', style({ opacity: '1' })),
      ]),
    ]),
  ],
})
export class ItemComponent implements OnInit {

  item: ProductI;
  @Output() breadEvent = new EventEmitter<string>();
  discountForm: FormGroup;
  discounts: Array<DiscountI>;
  openDiscount = false;

  size: string;
  colour: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    protected documentService: DocumentService,
    private cartBadgeService: CartBadgeService,
    private cartService: CartService,
    private snackBarService: SnackBarService,
    private location: Location,
    protected authService: AuthService,
    private discountService: DiscountService,
    private fb: FormBuilder
  ) { }

  /**
   * Carga el item
   */
  ngOnInit(): void {
    window.scroll(0, 0);
    this.openDiscount = false;

    // Si se ha accedido a el item mediante la navegacion de la pagina
    // obtiene el objeto, sin tener que hacer una peticion al back
    this.item = history.state.item;

    if (this.item === undefined) {
      this.productService.getProduct(this.route.snapshot.paramMap.get('id')).subscribe(
        res => {
          this.item = res;
          this.breadEvent.emit(this.item.name.toUpperCase());
        },
        () => this.router.navigate(['not-found']));
    } else {
      // Emite el nombre del producto para las migas de pan
      this.breadEvent.emit(this.item.name.toUpperCase());
    }
  }

  /**
   * Añade el producto al carrito
   */
  addToCart(): void {
    if (this.colour == null || this.size == null) {
      this.snackBarService.popup(802);
      return;
    }

    const orderDetails = this.generateOrderDetails();

    // Añade el orderDetail al carrito local storage
    this.cartService.addProductToCart(orderDetails);
    // Llama al servicio para actualizar la insignia
    this.cartBadgeService.update();
  }

  /**
   * Crea un orderDetails (el producto del orde details no tendra imagen para no sobrecargar localstorage)
   */
  private generateOrderDetails(): OrderDetailsI {
    // Clona el objeto sin img
    const itemWithoutImg = Object.assign({}, this.item);
    itemWithoutImg.documents = null;

    return {
      units: 1,
      colour: this.colour,
      size: this.size,
      product: itemWithoutImg
    };
  }

  /**
   * Añade el producto al carrito y redirige a el carrito
   * @param item: ProductI
   */
  buyNow(): void {
    if (this.colour == null || this.size == null) {
      this.snackBarService.popup(802);
      return;
    }

    this.addToCart();
    this.router.navigate(['/cart']);
  }

  /**
   * Borra un producto de BBDD
   * @param ProductI
   */
  deleteItem(): void {
    this.productService.deleteProduct(this.item).subscribe(
      () => {
        this.location.back();
        this.snackBarService.popup(203);
      },
      () => this.snackBarService.popup(500)
    );
  }

  /**
   * Carga los descuentos solo al clickar en la etiqueta de descuentos
   */
  loadDiscounts(): void {
    if (this.openDiscount === false) {
      this.discountService.getDiscounts().subscribe(res => this.discounts = res);
    }
  }

  /**
   * Aplica el descuento
   */
  submitDiscountForm(discountId: number): void {
    this.discountService.setDiscount(this.item.id, discountId).subscribe(
      () => this.snackBarService.popup(205),
      () => this.snackBarService.popup(500),
      () => {
        history.state.item = undefined;
        this.ngOnInit();
      }
    );
  }

}
