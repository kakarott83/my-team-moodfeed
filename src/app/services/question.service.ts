import { Injectable } from '@angular/core';
import { Question } from '../model/question';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()

export class QuestionService {

  constructor() { }

  public selectedQuestion = new BehaviorSubject<Question | undefined>(undefined);

  
}
