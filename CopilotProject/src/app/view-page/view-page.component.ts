import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../Services/property.service';
import { Property } from '../Models/Property';
import { ReviewService } from '../Services/review.service';
import { Review } from '../Models/Review';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.css']
})
export class ViewPageComponent {
  id: string | null = null;
  isLoading = true;
  property: Property | undefined;
  review: Review | undefined;
  constructor(private route: ActivatedRoute, private propertyService: PropertyService, private reviewService: ReviewService) { }
  reviewForm = new FormGroup({
    review: new FormControl(''),
    rating: new FormControl('')
  });
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.propertyService.getPropertyById(this.id).subscribe(property => {
        this.property = property;
        this.isLoading = false;
        console.log(this.property);
      });
      this.reviewService.getReviews(this.id).subscribe((reviews : Review)=> {
        this.review = reviews;
        console.log(this.review);
        console.log(reviews);
        this.isLoading = false;
      });
    }

}

onSubmit(): void {
  console.log(this.reviewForm.value);
  // Here you can call your service to submit the review
}
}
