import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../services/shared/data.service';
import { MessageService } from 'primeng/api';
import { FireService } from '../../../services/fire';
import { Reason } from '../../../model/reason';

@Component({
  selector: 'app-reason-form',
  templateUrl: './reason-form.component.html',
  styleUrl: './reason-form.component.scss'
})
export class ReasonFormComponent implements OnInit{


  reasonForm!: FormGroup
  myReason!: Reason

  constructor(private fire: FireService, private fb: FormBuilder, private dataService: DataService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.dataService.selectedReason.subscribe(data => {
      this.createForm(data)
    })
  }

  createForm(item?: Reason) {

    if(item) {
      this.reasonForm = this.fb.group({
        name: item.name,
        id: item.id
      })
    } else {
      this.reasonForm = this.fb.group({
        name: new FormControl('', Validators.required),
        id: new FormControl()
      })
    }
    
  }

  createReason() {
    this.myReason = {
      name: this.reasonForm.controls['name'].value
    }
  }

  saveReason() {
    this.createReason();
    const id = this.reasonForm.controls['id']?.value

    if(id) {
      this.fire.updateReason(id, this.myReason)
      .then(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Änderung gespeichert' });
      })
      .catch(error => {
        this.messageService.add({ severity: 'danger', summary: 'Error', detail: error });
      })
    } else {
      this.fire.createReason(this.myReason)
      .then(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Zweck gespeichert' });
      })
      .catch(error => {
        this.messageService.add({ severity: 'danger', summary: 'Error', detail: error });
      })
    }


    this.reasonForm.reset()
  }

  async getDocById(id: string) {
    const test = await this.fire.getReasonById(id)
  }





}
