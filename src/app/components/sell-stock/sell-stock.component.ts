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

    // To Do: Make entry to the balData
    // To Do: make sure ther is product before selling 

    // if (!this.balData.name) {
    //   this.firebaseService.getObj('/views/admin/stockStatus/'+this.dateService.formatYestDateString()+'/'+this.id).subscribe(balYestData => {
    //     this.balYestData = balYestData;
    //   });
    // }

    // Make entry to balStatus 
    // if (this.balData.name) {
    //   this.balData.balCost += (this.prodDet.costPUnit * this.volume);
    //   this.balData.balVolume += this.balData.balVolume - this.volume;
    //   this.balData.inVolume = 0;
    //   this.balData.inCost = 0;
    //   this.balData.outVolume += this.volume;
    //   this.balData.outCost += (this.prodDet.costPUnit * this.volume);
    // } else {
    //   this.balData.name = this.id;
    //   this.balYestData.balCost ? this.balData.balCost = (this.balYestData.balCost - (this.prodDet.costPUnit * this.volume)) : this.balData.balCost = 0 ;
    //   this.balYestData.balVolume ? this.balData.balVolume = this.balYestData.balVolume - this.volume : this.balData.balVolume= 0;
    //   this.balData.inVolume = 0;
    //   this.balData.inCost = 0;
    //   this.balData.outVolume = this.volume;
    //   this.balData.outCost = (this.prodDet.costPUnit * this.volume);
    // }
    // Update remaining products
    // if (this.prodDet.volume > this.volume){
      this.prodDet.volume -= this.volume;
      console.log(this.prodDet)
      this.firebaseService.makeEntrySet(this.prod, this.prodDet);
      // this.firebaseService.makeEntrySet(this.statusLoc, this.balData);
      this.firebaseService.makeEntryPush(this.recLoc, this.data);
      this.firebaseService.makeEntrySet(this.loc, this.data);
      this.router.navigate(['staff']);
    // }
  }

}
