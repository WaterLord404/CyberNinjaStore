import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { UserI } from '../../interfaces/userI';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      county: ['', Validators.required],
      state: ['', Validators.required],
      village: ['', Validators.required],
      postalCode: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      this.snackBarService.popup(300);
      return;
    }

    const customer: UserI = this.createCustomer();

    this.userService.register(customer).subscribe(
      () => {
        this.router.navigate(['/account/login']);
        this.snackBarService.popup(213);
      },
      err => {
        switch (err.status) {
          case 409:
            this.snackBarService.popup(0, err.error.message);
            break;
          default:
            this.snackBarService.popup(500);
            break;
        }
      }
    );
  }

  /**
   * Crea el usuario para enviarlo al servicio de registro
   */
  createCustomer(): UserI {
    return {
      username: this.f.username.value,
      password: this.f.password.value,
      customer: {
        name: this.f.name.value,
        surname: this.f.surname.value,
        email: this.f.email.value,
        telephone: this.f.telephone.value,
        county: this.f.county.value,
        state: this.f.state.value,
        village: this.f.village.value,
        postalCode: this.f.postalCode.value,
        address: this.f.address.value
      }
    };
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
}
