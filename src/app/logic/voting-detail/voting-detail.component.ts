import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Votingdetail } from '../../model/votingdetail';
import { RatingService } from '../../services/rating.service';
import { Rating } from '../../model/rating';

@Component({
  selector: 'app-voting-detail',
  templateUrl: './voting-detail.component.html',
  styleUrl: './voting-detail.component.scss'
})

export class VotingDetailComponent implements OnInit {

  @Input() inputItem!: Votingdetail
  @Output() result = new EventEmitter<Votingdetail>();
  votingItem!: Votingdetail;
  ratings!: Rating[];
  selectedRating!:Rating;
  value!: number;

  /**
   *
   */
  constructor(private ratingService: RatingService) {
  }


  ngOnInit(): void {
    this.ratings = this.ratingService.getRatings();
    this.selectedRating = this.ratings[0];
    this.votingItem = this.inputItem;
  }

  select(rating: any) {
    this.votingItem.rating = rating;
    this.selectedRating = rating;
    this.result.emit(this.votingItem);
  }

  vote(e: any) {
    let r = {
      value: this.value
    }

    this.votingItem.rating = r;
    this.result.emit(this.votingItem);
  }

  cancel(e: any) {
    console.log(this.votingItem)
    let r = {
      value: 0
    }
    
    this.votingItem.rating = r;
    this.result.emit(this.votingItem);
  }



}
