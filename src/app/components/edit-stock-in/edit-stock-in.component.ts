import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { DateTimeService } from '../../services/date-time.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-stock-in',
  templateUrl: './edit-stock-in.component.html',
  styleUrls: ['./edit-stock-in.component.css']
})
export class EditStockInComponent implements OnInit {
  stock: any;
  prodName: string;
  volume: number;
  costPUnit: number;
  id: string;
  addVolume: number;
  dayBal: any;
  bal: any;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private dateService: DateTimeService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.firebaseService.getObj('views/availableStock/'+this.id).subscribe(stock => {
      this.stock = stock;
      this.prodName = stock.name;
      this.volume = stock.volume;
      this.costPUnit = stock.costPUnit;
    });

    this.firebaseService.getObj('views/admin/stockBal/'+this.dateService.formatDateString()+'/'+this.prodName).subscribe(dayBal => {
      this.dayBal = dayBal;
    });

    this.firebaseService.getObj('views/admin/stockBal/track/'+this.prodName).subscribe(bal => {
      this.bal = bal;
    });
  }

    submitOrder() {
      let record = {
        name: this.prodName,
        volume: this.volume,
        costPUnit: this.costPUnit
      }
      this.addVolume ?  this.stock.volume = Number(this.stock.volume) + Number(this.addVolume) : Number(this.volume);
      this.stock.costPUnit = this.costPUnit;
      
      if (this.dayBal.name) {
        this.volume ? this.bal.balVol = Number(this.bal.balVol) + Number(this.addVolume) : false;
        this.bal.balCost = Number(this.bal.balCost) + (this.costPUnit * this.addVolume);
        this.addVolume ? this.bal.inVol = Number(this.bal.inVol) + Number(this.addVolume) : false;
        this.addVolume ? this.bal.inCost = Number(this.bal.inCost) + (this.addVolume * this.costPUnit) : false;
        this.bal.date = this.dateService.formatDate();
      } else {
        this.volume ? this.bal.balVol = Number(this.bal.balVol) + Number(this.addVolume) : false;
        this.bal.balCost = Number(this.bal.balCost) + (this.costPUnit * this.addVolume);
        this.addVolume ? this.bal.inVol = Number(this.addVolume) : false;
        this.addVolume ? this.bal.inCost = (this.addVolume * this.costPUnit) : false;
        this.bal.date = this.dateService.formatDate();
      }
      
      this.firebaseService.makeEntryPush('record/admin/stockin/'+this.dateService.formatDateString(), record);
      this.firebaseService.makeEntrySet('views/availableStock/'+this.id, this.stock);
      this.firebaseService.makeEntrySet('views/admin/stockBal/'+this.dateService.formatDateString()+'/'+this.prodName.toLowerCase().trim(), this.bal);
      this.firebaseService.makeEntrySet('views/admin/stockBal/track/'+this.prodName.toLowerCase().trim(), this.bal);
      this.router.navigate(['admin']);
    }
}
