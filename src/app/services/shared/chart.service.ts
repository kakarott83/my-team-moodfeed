import { Injectable } from '@angular/core';
import moment from 'moment';
import { FireService } from '../fire';
import { filter, map, pipe, tap } from 'rxjs';
import { Question } from '../../model/question';
import { Dataset } from '../../model/dataset';
import { Voting } from '../../model/voting';
import { UtilitiesService } from './utilities.service';

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
  totalLabel = 'Team Gesamt'



  constructor(private fire: FireService, private utilities: UtilitiesService) { }


  getWeeksPerYear(year: number) {
    return this.utilities.getWeeksPerYear(year);
  }



  getVotings(year: number, department: string) {
      return new Promise((resolve, reject) => {
        this.fire.getAllVotings().snapshotChanges()
        .pipe(
          map(changes => changes.map(c => 
            ({ id: c.payload.doc.id, ...c.payload.doc.data() })
          )),
          map(items => items.filter(item => item.department == department.toUpperCase() && item.votingYear == year.toString())
          )
        )
        .subscribe(data => resolve(data))
      })
      //.subscribe(data => console.log(data,'GetVoting'))
  }

  async getQuestions() {
    return await new Promise((resolve, reject) => {
      this.fire.getAllQuestions().snapshotChanges()
      .pipe(
        map(changes => changes.map(c => 
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        ))
      )
      .subscribe(data => resolve(data))
    })
  }



  async calcDataSets(year: number, department: string) {
      let votings: Voting[] = []
      let questions: Question[] = []
      let dataSetArray: Dataset[] = []
      let weeksArr = this.getWeeksPerYear(new Date().getFullYear())
      await this.getQuestions().then(data => {
        questions = data as Question[]
      })
      await this.getVotings(year, department).then(data => {
        votings = data as Voting[]
      })
  
      /*Fragen iterieren*/
      for (let index = 0; index < questions.length; index++) {
        const question = questions[index];
  
        /*Dataset erzeugen*/
        if(question.question !== undefined) {
          let ds = this.createDateSet(question.question?.toString(), false)
          let dsValues: number[] = [];
  
          /*Weeks erzeugen*/
          for (let index = 0; index < weeksArr.length; index++) {
            const week = weeksArr[index];
            let v: Voting[] = []
  
            /*Voting zu dieser Woche finden*/
            v = votings.filter(x => x.votingWeek == (index + 1).toString());

            let rSum = 0
  
            if(v.length > 0) {
              for (let index = 0; index < v.length; index++) {
                const q = v[index].votings?.find(x => x.id == question.id)
                if(q !== undefined && q.rating?.value !== undefined) {
                  rSum += Number(q.rating?.value);
                }
               }
              dsValues.push(Math.round(rSum / v.length))
            } else {
              //dsValues.push(0);
            }
          }
  
          ds.data = dsValues;
          dataSetArray.push(ds)     
        }
      }

        /*Overall*/
        /*Weeks*/
        if(votings.length > 0) {
          let ds = this.createDateSet(this.totalLabel, true)
          let dsValues: number[] = [];

          for (let index = 0; index < weeksArr.length; index++) {
            let v: Voting[] = []
            v = votings.filter(x => x.votingWeek == (index + 1).toString());
  
            let rSum = 0
  
            if(v.length > 0) {
              for (let index = 0; index < v.length; index++) {
                rSum += Number(v[index].total)
              }
              dsValues.push(Math.round(rSum / v.length))
            }
            else {
              //dsValues.push(0);
            }
          }


          ds.data = dsValues;
          dataSetArray.push(ds)
        }
        
      return dataSetArray
      //console.log(dataSetArray,'dataSetArray')
      //console.log(questions,'questions')
      //console.log(votings,'Votings')
  }

  createDateSet(label: string, total?: boolean) {
    let myDateSet: Dataset = {
      label: label,
      fill: false,
      tension: 0.4,
    }

    if(total) {
      myDateSet.borderDash = [5, 5]
    }


    return myDateSet
  }
}
