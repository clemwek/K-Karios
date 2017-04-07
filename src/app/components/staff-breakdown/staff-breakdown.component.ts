import { Component, OnInit } from '@angular/core';
import { DateTimeService } from '../../services/date-time.service';
import { FirebaseService } from '../../services/firebase.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-staff-breakdown',
  templateUrl: './staff-breakdown.component.html',
  styleUrls: ['./staff-breakdown.component.css']
})
export class StaffBreakdownComponent implements OnInit {
  staffSum: any;
  selectDate: string = this.dateService.formatDateString();
  productsSold: any;
  staffList: any = [];
  userProdList: any = [];

  constructor(
    private firebaseService: FirebaseService,
    private dateService:DateTimeService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.firebaseService.getGenView('staff/'+this.selectDate).subscribe(staffSum => {
      for (let singleStaff in staffSum) {
        this.staffList.push(staffSum[singleStaff]);
      }
      for (let i = 0; i < this.staffList.length; i++) {
        for (let prod in this.staffList[i]) {
          this.userProdList.push(this.staffList[i][prod]);
        }
      }
      // console.log(this.userProdList);
      this.staffSum = staffSum;
    } );

    
  } 

  getprodPUser() {
    for (let property in this.staffSum) {
      console.log(property);
    }
  }


}
