import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  /**
   * Crea un SnakBar con un mensaje
   * @param msg
   */
  popup(option: number): void {
    const msg = this.getError(option);
    this.snackBar.open(msg, '', {
      duration: 2222,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  private getError(option: number): string {
    let error = '';
    switch (option) {
      case 203:
        error = 'Successfully removed';
        break;
      case 201:
        error = 'Created successful';
        break;
      case 210:
        error = 'Login successful';
        break;
      case 211:
        error = 'Logout successful';
        break;
      case 212:
        error = 'Register successful';
        break;
      case 300:
        error = 'The form contains errors';
        break;
      case 301:
        error = 'The username and password you entered did not match our records';
        break;
      case 302:
        error = 'Username not available';
        break;
      case 403:
        error = 'Access denied';
        break;
      case 500:
        error = 'something went wrong';
        break;
      case 800:
        error = 'One product in your cart now does not exist';
        break;
      default:
        error = 'Unknown error';
        break;
    }
    return error;
  }
}
