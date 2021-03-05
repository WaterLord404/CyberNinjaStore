import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { ProductI } from 'src/app/modules/product/Interfaces/productI';
import { ProductService } from 'src/app/modules/product/services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  filesToUpload: FileList;

  sizes: Array<string> = ['S', 'M', 'L', 'X', 'XL'];
  colours: Array<string> = ['BLACK', 'WHITE', 'GRAY', 'KHAKI', 'RED', 'OCRE'];
  categories: Array<string> = ['NEW', 'WOMEN', 'SHIRTS', 'ACCESORIES', 'SWEATSHIRT', 'JACKETS', 'PANTS'];

  constructor(
    private fb: FormBuilder,
    private snackBarService: SnackBarService,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.form = this.fb.group({
      name: [, Validators.required],
      description: [, Validators.required],
      purchasePrice: [, [Validators.required, Validators.min(0)]],
      salePrice: [, [Validators.required, Validators.min(0)]],
      discount: [, [Validators.required, Validators.min(0), Validators.max(100)]],
      size: [, Validators.required],
      colour: [, Validators.required],
      category: [, Validators.required],
      documents: [, Validators.required]
    });
  }

  /**
   * Envia el formulario
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      this.snackBarService.popup(300);
      return;
    }

    const item: ProductI = this.generateProduct();
    this.productService.addProduct(item, this.filesToUpload).subscribe(
      () => this.snackBarService.popup(201),
      () => this.snackBarService.popup(500),
      () => {
        this.submitted = false;
        this.ngOnInit();
        window.scroll(0, 0);
      }
    );
  }

  private generateProduct(): ProductI {
    return {
      name: this.f.name.value,
      description: this.f.description.value,
      purchasePrice: this.f.purchasePrice.value,
      salePrice: this.f.salePrice.value,
      discount: this.f.discount.value,
      size: this.f.size.value,
      colour: this.f.colour.value,
      category: this.f.category.value,
    };
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
}
