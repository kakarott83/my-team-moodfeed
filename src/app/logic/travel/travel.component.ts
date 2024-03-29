import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Travel } from '../../model/travel';
import { UserService } from '../../services/shared/user.service';
import { MessageService } from 'primeng/api';
import { UtilitiesService } from '../../services/shared/utilities.service';
import { Customer } from '../../model/customer';
import { Spend } from '../../model/spend';
import { Spendtype } from '../../model/spendtype';
import { Upload } from '../../model/upload';
import { FireService } from '../../services/fire';
import { FileUpload } from 'primeng/fileupload';
import { BehaviorSubject, Observable, finalize, map, min, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DataService } from '../../services/shared/data.service';
import { MailService } from '../../services/shared/mail.service';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrl: './travel.component.scss',
  providers:[MessageService, MailService]
})
export class TravelComponent implements OnInit {

  myTravel!: Travel;
  myTravel$!: BehaviorSubject<Travel>
  myUser: any;
  isLoading = false;
  myTravelList: Travel[] = [];
  tabIndex = 0;



  constructor(
    private fire: FireService, 
    private fb: FormBuilder, 
    private userService: UserService, 
    private msgService: MessageService, 
    private utilityService: UtilitiesService,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  
  async ngOnInit() {    
    //this.myUser = this.userService.getUser();
    this.getTravels();
  }


    

  async getTravels(userId?: string) {
      this.isLoading = true;
      this.myUser = await this.userService.getAllUserData()
      this.fire.getTravelByUser2(this.myUser.uid).subscribe(data => {
        this.myTravelList = data
        this.dataService.travels$.next(this.myTravelList);
        console.log("🚀 ~ TravelComponent ~ myTravelList: ~ data:", data)
      })
  }

  changeTab(change: boolean) {
    if(change) {
      this.tabIndex = 0;
    }   
  }

}
