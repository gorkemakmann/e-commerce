import {Component, OnInit} from '@angular/core';
import {ReviewService} from "../../../features/review/services/review.service";
import {Review} from "../../../features/review/models/review.model";
import {UserService} from "../../../features/user/services/user.service";

@Component({
  selector: 'app-customer-review',
  templateUrl: './customer-review.component.html',
  styleUrls: ['./customer-review.component.css']
})
export class CustomerReviewComponent implements OnInit {
  randomReviews: Review[] = [];
  constructor(private reviewService: ReviewService, private userService: UserService) {
  }
  ngOnInit() {
    this.getRandomReviews();
  }

  getRandomReviews() {
    this.reviewService.getRandomReviews().subscribe(response => {
      response.forEach(review => {
        this.userService.getUserById(review.userId).subscribe(response => {
          review.userFirstName = response.firstName;
          review.userLastName = response.lastName;
        })
        this.randomReviews.push(review);
      })
    });
  }

}
