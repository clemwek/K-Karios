import { Component, OnInit } from '@angular/core';
import { DateTimeService } from '../../services/date-time.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-serving',
  templateUrl: './serving.component.html',
  styleUrls: ['./serving.component.css']
})
export class ServingComponent implements OnInit {
  searchFilter: string;
  inServed: any;
  pendingStock: any;
  obj: any;

  constructor(
    private firebaseService: FirebaseService,
    private dateService:DateTimeService
  ) { }

  ngOnInit() {
    this.firebaseService.getList('/record/staff/pendingServe/'+this.dateService.formatDateString()).subscribe(pendingStock => {
      this.pendingStock = pendingStock;
    });
  }

  upDateStatus(status, key) {
    this.firebaseService.getObj('/record/staff/pendingServe/'+this.dateService.formatDateString()+'/'+key).subscribe(obj => {
      this.obj = obj;
    });
    if (status == 'deliver') {
      this.obj.status = "pay";
      this.firebaseService.updateData('/record/staff/pendingServe/'+this.dateService.formatDateString()+'/'+key, this.obj)
    } else if (status == 'pay') {
      this.obj.status = "complete";
      this.firebaseService.makeEntryPush('/record/staff/complete/'+this.dateService.formatDateString(), this.obj)
      this.firebaseService.delObj('/record/staff/pendingServe/'+this.dateService.formatDateString()+'/'+key)

    }
  }

}
