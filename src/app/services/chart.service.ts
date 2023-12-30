import { Injectable } from '@angular/core';
import moment from 'moment';
import { FireService } from './fire';
import { filter, map, pipe, tap } from 'rxjs';
import { Question } from '../model/question';
import { Dataset } from '../model/dataset';
import { Voting } from '../model/voting';

enum LineColor {
  Green = 1,
  Blue = 2
}

@Injectable()

export class ChartService {

  questionList: Question[] = []
  myDataSets: Dataset[] = []
  votingList: Voting[] = []
  filteredVotings: any



  constructor(private fire: FireService) { }


  getWeeksPerYear(year: number) {
    let y = moment().year(year);
    let weeksArr: string[] = [];
    console.log(y.isoWeeksInYear());

    for (let index = 0; index < y.isoWeeksInYear(); index++) {
      let week = index + 1
      weeksArr.push(week.toString())
    }
    return weeksArr
  }



  getVotings() {
      return new Promise((resolve, reject) => {
        this.fire.getAllVotings().snapshotChanges()
        .pipe(
          map(changes => changes.map(c => 
            ({ id: c.payload.doc.id, ...c.payload.doc.data() })
          )),
          map(items => items.filter(item => item.department == "FOMO" && item.votingYear == "2023")
          )
        )
        .subscribe(data => resolve(data))
      })
      //.subscribe(data => console.log(data,'GetVoting'))
  }

  getVotingMain() {
    let votings: Voting[]
    let qArr: string[]
    let weeksArr = this.getWeeksPerYear(new Date().getFullYear())
    this.getVotings().then(data => {
      votings = data as Voting[];

      /*Weeks*/
      for (let index = 0; index < weeksArr.length; index++) {
        const element = weeksArr[index];
        let filterByWeeks = [];

        filterByWeeks = votings.filter(x => x.votingWeek = (index + 1).toString())
        if(filterByWeeks.length > 0) {
          console.log(filterByWeeks, 'Weeks1')
        } else {
          console.log('kein', 'Weeks2')
        }
        
      }



      /*Votings*/
      for (let index = 0; index < votings.length; index++) {
        const element = votings[index];


             
      }

      

      console.log(votings,'VotingsMain')
    })

    
  }

  getQuestions() {
    return new Promise((resolve, reject) => {
      this.fire.getAllQuestions().snapshotChanges()
      .pipe(
        map(changes => changes.map(c => 
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        ))
      )
      .subscribe(data => {
        this.questionList = data
        console.log(this.questionList);

        this.questionList.forEach(x => {
          if(x.question)
          this.myDataSets.push(this.createDateSet(x.question))
        })
        resolve(this.myDataSets)
      })
    })
  }

  createDateSet(label: string) {
    let myDateSet: Dataset = {
      label: label,
      data: [3,2,4,6],
      fill: true,
      tension: 0.4
    }
    return myDateSet
  }
}
