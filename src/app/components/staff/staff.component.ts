import { Component, OnInit } from '@angular/core';
import { DateTimeService } from '../../services/date-time.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  something: any;
  availableStock: any;
  inServed: any;
  pendingStock: any;

  constructor(
    private firebaseService: FirebaseService,
    private dateService:DateTimeService
  ) { }

  ngOnInit() {
    this.firebaseService.getGenView('availableStock').subscribe(availableStock => {
      this.availableStock = availableStock;
    } );
  }

}
