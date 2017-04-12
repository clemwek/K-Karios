import { Component, OnInit } from '@angular/core';
import { DateTimeService } from '../../services/date-time.service';
import { FirebaseService } from '../../services/firebase.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  searchFilter: string;
  availableStock: any;
  inServed: any;
  pendingStock: any;
  locAdmin: string = 'users/admin/'+this.firebaseService.uid;
  user: any = this.userService.checkUser(this.locAdmin);

  constructor(
    private firebaseService: FirebaseService,
    private dateService:DateTimeService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.firebaseService.getGenView('availableStock').subscribe(availableStock => {
      this.availableStock = availableStock;
    } );
  }

}
