import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Department } from '../../model/department';
import { FireService } from '../../services/fire';
import { MessageService } from 'primeng/api';
import { DataService } from '../../services/shared/data.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss',
  providers: [MessageService, DataService]

})

export class DepartmentComponent implements OnInit {

  departmentForm!: FormGroup
  myDepartment: Department = {}

  constructor(private fb: FormBuilder, private fire: FireService, private msgService: MessageService, private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.selectedDepartment.subscribe(data => {
      this.createDepartmentForm(data);
    })
  }

  createDepartment() {
    this.myDepartment = {
      name: this.departmentForm.get('name')?.value,
      displayName: this.departmentForm.get('displayName')?.value
    }
  }

  createDepartmentForm(item?: Department) {
    if(item) {
      this.departmentForm = this.fb.group({
        name: new FormControl(item.name, [Validators.required]),
        displayName: new FormControl(item.displayName, [Validators.required]),
        id: new FormControl({value: item.id, disabled: true}),
      })
    }
      else {
        this.departmentForm = this.fb.group({
          name: new FormControl('',[Validators.required]),
          displayName: new FormControl('', [Validators.required]),
          id: new FormControl({value: '', disabled: true})
      })
    }
  }

  saveDepartment() {
    this.createDepartment();
    const id = this.departmentForm.get('id')?.value

    if(id) {
      this.fire.updateDepartment(id, this.myDepartment).then(() => {
        this.msgService.add({ severity: 'success', summary: 'Success', detail: 'Änderung gespeichert' });
      })
    } else {
      this.fire.createDepartment(this.myDepartment)
      .then(() => {
        this.msgService.add({ severity: 'success', summary: 'Success', detail: 'Abteilung gespeichert' });
      })
    }

    this.departmentForm.reset();
  }



}
