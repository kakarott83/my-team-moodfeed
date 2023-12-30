import { Injectable } from '@angular/core';

@Injectable()
export class CalculateRatingService {


  constructor() { }

  calculateRating(votings: any) {
    let rating = 0;
    let array = votings;
    for (let index = 0; index < array.length; index++) {
      rating += array[index].rating.value
    }

    rating = Math.round(rating/array.length)

    return rating
  }

}
