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
  popup(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
