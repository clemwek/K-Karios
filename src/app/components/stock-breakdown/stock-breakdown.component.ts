import { Component, OnInit } from '@angular/core';
import { DateTimeService } from '../../services/date-time.service';
import { FirebaseService } from '../../services/firebase.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-stock-breakdown',
  templateUrl: './stock-breakdown.component.html',
  styleUrls: ['./stock-breakdown.component.css']
})
export class StockBreakdownComponent implements OnInit {
  stockStatus: any;
  selectDate: string = this.dateService.formatDateString();

  constructor(
    private firebaseService: FirebaseService,
    private dateService:DateTimeService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.selectDate ? this.selectDate : this.selectDate = this.dateService.formatDateString();
    this.firebaseService.getGenView('admin/stockBal/'+this.selectDate).subscribe(stockStatus => {
      console.log(stockStatus)
      this.stockStatus = stockStatus;
    } );
  }

}
