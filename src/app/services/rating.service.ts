import { Injectable } from '@angular/core';
import { Rating } from '../model/rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  ratingList!: Rating[];

  constructor() {
    this.ratingList = [
      {id: "veryGood", value: 1, iconName: "fa-regular fa-face-smile", displayText: "Sehr gut", color: "#8fb935"},
      {id: "good", value: 2, iconName: "fa-regular fa-face-smile", displayText: "Gut", color: "#b0ce71"},
      {id: "normal", value: 3, iconName: "fa-regular fa-face-smile", displayText: "Geht so", color: "#e6e22e"},
      {id: "bad", value: 4, iconName: "fa-regular fa-face-smile", displayText: "Schlecht", color: "#e09c3b"},
      {id: "veryBad", value: 5, iconName: "fa-regular fa-face-smile", displayText: "Richtig mies", color: "#e64747"},
    ]
  }

  getRatings() {
    return this.ratingList;
  }
}

