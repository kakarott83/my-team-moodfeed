import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Department } from '../../model/department';
import { Question } from '../../model/question';
import { UserData } from '../../model/user-data';

@Injectable()

export class DataService {

  constructor() { }

  public selectedDepartment = new BehaviorSubject<Department | undefined>(undefined);
  public selectedQuestion = new BehaviorSubject<Question | undefined>(undefined);
  public selectedUser = new BehaviorSubject<UserData | undefined>(undefined);

}
