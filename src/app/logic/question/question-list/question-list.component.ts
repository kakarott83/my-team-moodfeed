import { Component, OnInit} from '@angular/core';
import { Question } from '../../../model/question';
import { VotingService } from '../../../services/voting.service';
import { map } from 'rxjs/operators';
import { DataService } from '../../../services/shared/data.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.scss'
})
export class QuestionListComponent implements OnInit{

  
  questionList: Question[] = []

  constructor(private votingService: VotingService, private dataService: DataService) {

  }


  ngOnInit(): void {
    this.votingService.getAllQuestions().snapshotChanges()
    .pipe(
      map(changes => changes.map(c => 
        ({ id: c.payload.doc.id, ...c.payload.doc.data() })
      ))
    )
    .subscribe(data => {
      this.questionList = data
    })
  }

  selectQuestion(item: Question) {
    this.dataService.selectedQuestion.next(item);
  }



}
