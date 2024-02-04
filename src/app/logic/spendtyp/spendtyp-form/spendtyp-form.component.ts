import { Component, OnInit } from '@angular/core';
import { SpendType } from '../../../model/spend-type';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FireService } from '../../../services/fire';
import { DataService } from '../../../services/shared/data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-spendtyp-form',
  templateUrl: './spendtyp-form.component.html',
  styleUrl: './spendtyp-form.component.scss'
})
export class SpendtypFormComponent implements OnInit{

  spendTypeForm!: FormGroup
  mySpendType!: SpendType

  constructor(private fire: FireService, private fb: FormBuilder, private dataService: DataService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.dataService.selectedSpendtyp.subscribe(data => {
      this.createForm(data)
    })
  }

  createForm(item?: SpendType) {

    if(item) {
      this.spendTypeForm = this.fb.group({
        name: item.name,
        id: item.id
      })
    } else {
      this.spendTypeForm = this.fb.group({
        name: new FormControl('', Validators.required),
        id: new FormControl()
      })
    }
    
  }

  createSpendtype() {
    this.mySpendType = {
      name: this.spendTypeForm.controls['name'].value
    }
  }

  saveSpendType() {
    this.createSpendtype();
    const id = this.spendTypeForm.controls['id']?.value

    if(id) {
      this.fire.updateSpendType(id, this.mySpendType)
      .then(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Änderung gespeichert' });
      })
      .catch(error => {
        this.messageService.add({ severity: 'danger', summary: 'Error', detail: error });
      })
    } else {
      this.fire.createSpendType(this.mySpendType)
      .then(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Zweck gespeichert' });
      })
      .catch(error => {
        this.messageService.add({ severity: 'danger', summary: 'Error', detail: error });
      })
    }


    this.spendTypeForm.reset()
  }







}
