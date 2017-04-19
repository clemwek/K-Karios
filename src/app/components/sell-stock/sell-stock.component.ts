import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { DateTimeService } from '../../services/date-time.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-sell-stock',
  templateUrl: './sell-stock.component.html',
  styleUrls: ['./sell-stock.component.css']
})
export class SellStockComponent implements OnInit {
  id: any;
  prodDet: any;
  loc: string;
  recLoc: string;
  statusLoc: string;
  prod: string;
  data: any;
  tableName: string;
  volume: number;
  uDets: any;
  balData: any;
  balYestData: any;
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

    this.loc = "/views/staff/"+this.dateService.formatDateString()+"/"+this.firebaseService.uid+"/"+this.id;
    this.recLoc = "/record/staff/pendingServe/"+this.dateService.formatDateString();
    this.prod = "/views/availableStock/"+this.id;
    this.statusLoc = '/views/admin/stockStatus/'+this.dateService.formatDateString()+'/'+this.id;

    this.firebaseService.getObj(this.loc).subscribe(uDets => {
      this.uDets = uDets;
    });

    this.firebaseService.getObj('views/admin/stockBal/'+this.dateService.formatDateString()+'/'+this.id).subscribe(dayBal => {
      this.dayBal = dayBal;
    });

    this.firebaseService.getObj('views/admin/stockBal/track/'+this.id).subscribe(bal => {
      this.bal = bal;
    });

    this.firebaseService.getObj('/views/admin/stockStatus/'+this.dateService.formatDateString()+'/'+this.id).subscribe(balData => {
      this.balData = balData;
    });
    
    this.firebaseService.getObj(this.prod).subscribe(prodDet => {
      this.prodDet = prodDet;
    });
    
  }
  submitOrder() {
    if (this.uDets.name) {
      this.data = {
        name: this.id,
        table: this.tableName,
        volume: Number(this.volume) + Number(this.uDets.volume),
        costPUnit: this.prodDet.costPUnit,
        costTotal: (this.prodDet.costPUnit * this.volume) + this.uDets.costTotal,
        status: 'deliver',
        uid: this.firebaseService.uid
      };
    } else {
      this.data = {
        name: this.id,
        table: this.tableName,
        volume: this.volume,
        costPUnit: this.prodDet.costPUnit,
        costTotal: (this.prodDet.costPUnit * this.volume),
        status: 'deliver',
        uid: this.firebaseService.uid
      };
    }

    if (this.dayBal.name) {
      this.bal.balCost = Number(this.bal.balCost) - (this.volume*this.prodDet.costPUnit);
      this.bal.balVol = Number(this.bal.balVol) - Number(this.volume);
      this.bal.outVol = Number(this.bal.outVol) + Number(this.volume);
      this.bal.outCost = Number(this.bal.outCost) + (this.volume * this.prodDet.costPUnit);
    } else {
      this.bal.balCost = Number(this.bal.balCost) - (this.volume*this.prodDet.costPUnit);
      this.bal.balVol = Number(this.bal.balVol) - Number(this.volume);
      this.bal.outVol = this.volume;
      this.bal.outCost = (this.volume * this.prodDet.costPUnit);
    }

    this.firebaseService.makeEntrySet('views/admin/stockBal/'+this.dateService.formatDateString()+'/'+this.id.toLowerCase().trim(), this.bal);
    this.firebaseService.makeEntrySet('views/admin/stockBal/track/'+this.id.toLowerCase().trim(), this.bal);

    this.prodDet.volume -= this.volume;
    this.firebaseService.makeEntrySet(this.prod, this.prodDet);
    
    this.firebaseService.makeEntryPush(this.recLoc, this.data);
    this.firebaseService.makeEntrySet(this.loc, this.data);
    this.router.navigate(['staff']);
  }
}
