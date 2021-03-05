import { animate, style, transition, trigger } from '@angular/animations';
import { Location } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { DocumentService } from 'src/app/core/services/document.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { CartBadgeService } from 'src/app/services/cart-badge.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductI } from '../../Interfaces/productI';
import { ProductService } from '../../services/product.service';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    protected documentService: DocumentService,
    private cartBadgeService: CartBadgeService,
    private cartService: CartService,
    private snackBarService: SnackBarService,
    private location: Location,
    protected authService: AuthService
  ) { }

  /**
   * Carga el item
   */
  ngOnInit(): void {
    window.scroll(0, 0);
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
  addToCart(itemId: number): void {
    // Añade el producto al carrito local storage
    this.cartService.addProductToCart(itemId);
    // Llama al servicio para actualizar la insignia
    this.cartBadgeService.update();
  }

  /**
   * Añade el producto al carrito y redirige a el carrito
   * @param item: ProductI
   */
  buyNow(itemId: number): void {
    this.addToCart(itemId);
    this.router.navigate(['/cart']);
  }

  /**
   * Borra un producto de BBDD
   * @param ProductI
   */
  deleteItem(item: ProductI): void {
    this.productService.deleteProduct(item).subscribe(
      () => {
        this.location.back();
        this.snackBarService.popup(203);
      },
      err => this.snackBarService.popup(err.status)
    );
  }
}
