import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DocumentService } from 'src/app/core/services/document.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { ProductI } from 'src/app/modules/product/Interfaces/productI';
import { ReviewI } from 'src/app/modules/product/Interfaces/reviewI';
import { ReviewService } from 'src/app/modules/product/services/review.service';

@Component({
  selector: 'app-rating-dialog',
  templateUrl: './rating-dialog.component.html',
  styleUrls: ['./rating-dialog.component.scss']
})
export class RatingDialogComponent implements OnInit {

  item: ProductI;
  form: FormGroup;
  submitted = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public documentService: DocumentService,
    public router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private snackBarService: SnackBarService,
    private reviewService: ReviewService
  ) {
    this.item = data;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      value: ['', Validators.required],
      details: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(255)]],
    });
  }

  /**
   * Crea el usuario
   */
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      this.snackBarService.popup(300);
      return;
    }

    const review: ReviewI = this.createReview();

    this.reviewService.addReview(this.item.id, review).subscribe(
      () => {
        this.dialog.closeAll();
        this.snackBarService.popup(214);
      },
      err => {
        switch (err.status) {
          case 409:
            this.snackBarService.popup(410)
            break;
          default:
            this.snackBarService.popup(500)
            break;
        }
      }
    );
  }

  createReview(): ReviewI {
    return {
      value: this.f.value.value,
      details: this.f.details.value
    };
  }

  get f() { return this.form.controls; }
}
