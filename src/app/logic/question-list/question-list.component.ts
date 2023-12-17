import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Question } from '../../model/question';
import { VotingService } from '../../services/voting.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.scss'
})
export class QuestionListComponent implements OnInit{

  @Output() selectedQuestion = new EventEmitter<Question>();


  
  questionList: Question[] = []

  constructor(private votingService: VotingService) {

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

  selectQuestion(item: any) {
    this.selectedQuestion.emit(item);
  }



}
