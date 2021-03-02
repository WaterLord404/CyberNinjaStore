import { animate, style, transition, trigger } from '@angular/animations';
import { Location } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommunicationService } from 'src/app/core/services/communication.service';
import { DocumentService } from 'src/app/core/services/document.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
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
  msg: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    protected documentService: DocumentService,
    private communicationService: CommunicationService,
    private cartService: CartService,
    private snackBarService: SnackBarService,
    private location: Location,
    protected authService: AuthService
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0);
    // Si se ha accedido a el item mediante la navegacion de la pagina
    // obtiene el objeto, sin tener que hacer una peticion al back
    this.item = history.state.item;

    if (this.item === undefined) {
      this.productService.getProduct(this.route.snapshot.paramMap.get('id'))
        .subscribe(
          res => {
            this.item = res;
            this.breadEvent.emit(this.item.name.toUpperCase());
          },
          () => this.router.navigate(['not-found'])
        );
    } else {
      this.breadEvent.emit(this.item.name.toUpperCase());
    }
  }

  /**
   * Añade el producto al carrito
   */
  addToCart(item: ProductI): void {
    // Llama al servicio para actualizar la insignia
    this.communicationService.callComponentMethod('+badge');
    // Añade el producto al carrito
    this.cartService.addProductToCart(item);
  }

  /**
   * Añade el producto al carrito y redirige a el carrito
   * @param item: ProductI
   */
  buyNow(item: ProductI): void {
    this.addToCart(item);
    this.router.navigate(['/cart']);
  }

  deleteItem(item: ProductI): void {
    this.productService.deleteProduct(item).subscribe(
      () => {
        this.location.back();
        this.snackBarService.popup(203);
      },
      err => {
        switch (err.status) {
          case 403:
            this.snackBarService.popup(403);
            break;
          default:
            this.snackBarService.popup(500);
            break;
        }
      }
    );
  }

}
