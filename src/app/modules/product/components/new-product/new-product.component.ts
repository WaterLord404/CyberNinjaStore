import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
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
  item: ProductI;

  sizes: Array<string>;
  colours: Array<string>;
  categories: Array<string>;

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
      size: [, Validators.required],
      colour: [, Validators.required],
      category: [, Validators.required],
      documents: [, Validators.required]
    });

    this.productService.getCategories().subscribe(res => this.categories = res);
    this.productService.getColours().subscribe(res => this.colours = res);
    this.productService.getSizes().subscribe(res => this.sizes = res);
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

    this.item = this.generateProduct();

    this.productService.addProduct(this.item, this.filesToUpload).pipe(finalize(
      () => {
        this.submitted = false;
        this.ngOnInit();
        window.scroll(0, 0);
      }
    )).subscribe(
      () => this.snackBarService.popup(201),
      () => this.snackBarService.popup(500),
    );
  }

  private generateProduct(): ProductI {
    const product: ProductI = {
      name: this.f.name.value,
      description: this.f.description.value,
      purchasePrice: this.f.purchasePrice.value,
      salePrice: this.f.salePrice.value,
      size: this.f.size.value,
      colour: this.f.colour.value,
      category: this.f.category.value
    };
    return product;
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
}
