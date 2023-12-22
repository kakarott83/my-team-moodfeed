import { Component } from '@angular/core';
import { Question } from '../../model/question';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-question-bundle',
  templateUrl: './question-bundle.component.html',
  styleUrl: './question-bundle.component.scss',
  providers: [QuestionService]
})
export class QuestionBundleComponent {

  mySelectedQuestion: Question = {};

  selectedQuestion(item: any) {
    this.mySelectedQuestion = item;
    console.log(this.mySelectedQuestion,'Parent')
  }

}
