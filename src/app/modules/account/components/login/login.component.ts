import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { UserI } from '../../interfaces/userI';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: UserI;
  submitted = false;
  msg: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBarService: SnackBarService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.user = {
      username: '',
      password: ''
    };
  }

  /**
   * Loguea al usuario en el sistema
   */
  onSubmit(form: FormGroup): void {
    this.submitted = true;
    // stop here if form is invalid
    if (form.invalid) {
      this.msg = 'The form contains errors';
      this.snackBarService.popup(this.msg);
      return;
    }

    this.userService.login(this.user).subscribe(
      res => {
        // Guarda al usuario, el estado "logged" y el jwt
        this.authService.login(res.body, res.headers.get('Authorization'));
        this.router.navigate(['/']);
      },

      // Lanza snackBar
      err => {
        switch (err.status.toString()) {
          case '403':
            this.msg = 'The username and password you entered did not match our records';
            break;
          default:
            this.msg = 'something went wrong';
            break;
        }
        this.snackBarService.popup(this.msg);
      }
    );
  }
}
