import { Component, OnInit } from '@angular/core';
import { DateTimeService } from '../../services/date-time.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit {
  searchFilter: string;
  complete: any;

  constructor(
    private firebaseService: FirebaseService,
    private dateService:DateTimeService
  ) { }

  ngOnInit() {
    this.firebaseService.getList('/record/staff/complete/'+this.dateService.formatDateString()).subscribe(complete => {
      this.complete = complete;
    });
  }

}
