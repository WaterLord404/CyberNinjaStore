import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewI } from '../../Interfaces/reviewI';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-item-review',
  templateUrl: './item-review.component.html',
  styleUrls: ['./item-review.component.scss']
})
export class ItemReviewComponent implements OnInit {

  reviews: Array<ReviewI> = [];

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.reviewService.getProductReviews(this.route.snapshot.paramMap.get('id')).subscribe(res => this.reviews = res);
  }

}
