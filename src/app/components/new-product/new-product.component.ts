import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    // this.form = this.fb.group({
    //   username: ['', Validators.required],
    //   password: ['', [Validators.required, Validators.minLength(6)]],
    //   name: ['', Validators.required],
    //   surname: ['', Validators.required],
    //   email: ['', [Validators.required, Validators.email]],
    //   telephone: ['', Validators.required],
    //   region: ['', Validators.required],
    //   province: ['', Validators.required],
    //   locality: ['', Validators.required],
    //   postalCode: ['', Validators.required],
    //   address: ['', Validators.required]
    // });
  }

  onSubmit() {
    // this.submitted = true;
    // // stop here if form is invalid
    // if (this.form.invalid) {
    //   this.snackBarService.popup(300);
    //   return;
    // }
  }

  // convenience getter for easy access to form fields
  // get f() { return this.form.controls; }
}
