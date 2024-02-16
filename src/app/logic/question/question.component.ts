import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from '../../model/question';
import { FireService } from '../../services/fire';
import { Observable, from } from 'rxjs';
import { MessageService } from 'primeng/api';
import { DataService } from '../../services/shared/data.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
  providers: [MessageService]
})

export class QuestionComponent implements OnInit, OnChanges {

  question!: Observable<Question>;

  questionForm!: FormGroup;
  myQuestion: Question = {};
  submitted = false

  constructor(private fb: FormBuilder, private fire: FireService, private msgService: MessageService, private dataService: DataService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.dataService.selectedQuestion.subscribe(data => {
      this.createQuestionsForm(data);
    });
  }


  createQuestionsForm(item?: Question) {
    if(item) {
      this.questionForm = this.fb.group({
        question: new FormControl(item.question, Validators.required),
        activeFlag: item.active,
        id: new FormControl({value: item.id, disabled: true})
      })
    }
      else {
        this.questionForm = this.fb.group({
          question: '',
          activeFlag: true,
          //id: [{value: '', disabled: true}]
          id: new FormControl({value: '', disabled: true})
      })
    }
  }

  createQuestion() {
    this.myQuestion = {
      question: this.questionForm.get('question')?.value,
      active: this.questionForm.get('activeFlag')?.value,
    }
  }

  saveQuestion() {
    this.createQuestion();
    const id = this.questionForm.get('id')?.value

    if(id) {
      this.fire.updateQuestion(id, this.myQuestion).then(() => {
        this.msgService.add({ severity: 'success', summary: 'Success', detail: 'Änderung gespeichert' });
      })
    } else {
      this.fire.createQuestion(this.myQuestion)
      .then(() => {
        this.msgService.add({ severity: 'success', summary: 'Success', detail: 'Frage gespeichert' });
      })
    }

    this.questionForm.reset();
  }
}


