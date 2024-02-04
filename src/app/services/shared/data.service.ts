import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Department } from '../../model/department';
import { Question } from '../../model/question';
import { UserData } from '../../model/user-data';
import { Travel } from '../../model/travel';
import { Reason } from '../../model/reason';
import { SpendType } from '../../model/spend-type';

@Injectable()

export class DataService {

  constructor() { }

  public selectedDepartment = new BehaviorSubject<Department | undefined>(undefined);
  public selectedQuestion = new BehaviorSubject<Question | undefined>(undefined);
  public selectedUser = new BehaviorSubject<UserData | undefined>(undefined);
  public selectedTravel = new BehaviorSubject<Travel | undefined>(undefined);
  public selectedReason = new BehaviorSubject<Reason | undefined>(undefined);
  public selectedSpendtyp = new BehaviorSubject<SpendType | undefined>(undefined);

}
