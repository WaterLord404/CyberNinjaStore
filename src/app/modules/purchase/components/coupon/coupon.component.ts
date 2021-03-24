import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { CouponI } from '../../interfaces/coupon';
import { CouponService } from '../../services/coupon.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss'],
  animations: [
    trigger(
      'inOutAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(30%)' }),
        animate('200ms ease-in', style({ transform: 'translateY(0%)' }))
      ])]
    )
  ]
})
export class CouponComponent implements OnInit {

  @Output() closePopUpEvent = new EventEmitter<any>();
  @Output() couponEvent = new EventEmitter<CouponI>();
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private couponService: CouponService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      code: ['', [Validators.required]]
    });
  }

  /**
   * Cierra el componente cupon con un output
   */
  closePopUp(): void {
    this.closePopUpEvent.emit();
  }

  onSubmit(): void {

    if (this.form.invalid) { return; }

    const coupon: CouponI = this.generateCoupon();

    this.couponService.getCoupon(coupon).subscribe(
      // Guarda el cupon utilizando un output
      res => {
        this.couponEvent.emit(res);
        this.closePopUp();
      },
      err => {
        this.couponEvent.emit(null);
        this.closePopUp();
        switch (err.status) {
          case 404:
            this.snackBarService.popup(801);
            break;
          default:
            this.snackBarService.popup(500);
            break;
        }
      }
    );
  }

  /**
   * Genera el cupon
   */
  generateCoupon(): CouponI {
    return {
      code: this.f.code.value
    };
  }

  get f() {
    return this.form.controls;
  }
}
