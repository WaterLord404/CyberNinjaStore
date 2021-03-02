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

  constructor(
    private fb: FormBuilder,
    private snackBarService: SnackBarService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.filesToUpload = null;
    this.form = this.fb.group({
      name: ['TEST', [Validators.required]],
      description: ['ASDASDASDASD', [Validators.required]],
      purchasePrice: [20, [Validators.required]],
      salePrice: [30, [Validators.required]],
      discount: [0, [Validators.required]],
      size: [[], ],
      colour: [[], ],
      category: [[], ],
      documents: [[], [Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      this.snackBarService.popup(300);
      return;
    }

    const item: ProductI = this.generateProduct();
    this.productService.addProduct(item, this.filesToUpload).subscribe(
      res => console.log(res)
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
