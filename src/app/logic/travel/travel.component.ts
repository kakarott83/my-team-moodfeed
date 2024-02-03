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
import { error } from 'console';
import { BehaviorSubject, Observable, finalize, map, min, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { BlobOptions } from 'buffer';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrl: './travel.component.scss',
  providers:[UserService,MessageService, UtilitiesService]
})
export class TravelComponent implements OnInit {

  myTravel: Travel = {};
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
    private router: Router,
    private route: ActivatedRoute) {
  }

  
  ngOnInit(): void {

    //const id = this.route.snapshot.paramMap.get('id')!;
    //console.log("🚀 ~ TravelComponent ~ ngOnInit ~ id:", id)

    //this.fire.getTravelById(id).subscribe(data => console.log(data))
    

    this.myUser = this.userService.getUser();

    this.getTravels(this.myUser.uid);
  }

  getTravels(userId: string) {
    if(userId) {
      this.isLoading = true;
      this.fire.getTravelByUserId(userId).snapshotChanges()
        .pipe(
          map(changes => changes.map(x => 
            ({id: x.payload.doc.id, ...x.payload.doc.data()})
            )),
        )
        .subscribe(data => {
          this.myTravelList = data
          this.isLoading = false;
          //console.log(this.myTravelList,'MyTravelList')
        })
    } else {
    }
  }

  changeTab(change: boolean) {
    if(change) {
      this.tabIndex = 0;
    }   
  }

}
