import { Component, OnInit } from '@angular/core';
import { Department } from '../../../model/department';
import { VotingService } from '../../../services/voting.service';
import { map } from 'rxjs/operators';
import { DataService } from '../../../services/shared/data.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.scss'
})
export class DepartmentListComponent implements OnInit{

  departmentList: Department[] = []

  constructor(private votingService: VotingService, private dataService: DataService) {}

  ngOnInit(): void {
    this.votingService.getAllDepartments().snapshotChanges()
      .pipe(
        map(changes => changes.map(c => 
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )) 
      )
      .subscribe(data => {
        this.departmentList = data
      })
  }

  selectDepartment(item: Department) {
    this.dataService.selectedDepartment.next(item);
  }

}
