import { animate, style, transition, trigger } from '@angular/animations';
import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommunicationService } from 'src/app/core/services/communication.service';
import { DocumentService } from 'src/app/core/services/document.service';
import { ProductI } from 'src/app/modules/product/Interfaces/productI';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('30ms ease-in', style({ opacity: '1' })),
      ]),
      transition(':leave', [
        style({ opacity: '1' }),
        animate('300ms ease-out', style({ opacity: '0' }))
      ])
    ]),
  ],
})
export class CartComponent implements OnInit {

  cartProducts: Array<ProductI> = [];

  constructor(
    private router: Router,
    private documentService: DocumentService,
    private comunicationService: CommunicationService,
    private authService: AuthService
  ) { }

  // Obtiene los productos del carrito
  ngOnInit(): void {
    window.scroll(0, 0);
    this.cartProducts = JSON.parse(localStorage.getItem('cart'));
  }

  /**
   * Borra un producto del carrito
   * @param item: ProductI
   */
  deleteThisItem(item: ProductI): void {
    this.cartProducts.forEach(element => {
      if (element === item) {
        const i = this.cartProducts.indexOf(element);
        this.cartProducts.splice(i, 1);
      }
    });

    localStorage.setItem('cart', JSON.stringify(this.cartProducts));

    // Actualiza el productBadge
    this.comunicationService.callComponentMethod('-badge');
  }

  /**
   * Transforma los Byte[] a blob
   * @param data: Byte[]
   * @param type: string
   */
  dataToImg(data: Byte[], type: string): string {
    return this.documentService.dataToImg(data, type);
  }

  /**
   * Navega a el producto
   * @param item: ProductI
   */
  goToProduct(item: ProductI): void {
    this.router.navigate(['/products/' + item.id]);
  }
}
