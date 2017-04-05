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
  prod: string;
  data: any;
  tableName: string;
  volume: number;
  uDets: any;


  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private dateService: DateTimeService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.loc = "/views/staff/"+this.dateService.formatDateString()+"/"+this.firebaseService.uid+"/"+this.id;
    this.recLoc = "/record/pendingServe/"+this.dateService.formatDateString();
    this.prod = "/views/availableStock/"+this.id;

    this.firebaseService.getObj(this.loc).subscribe(uDets => {
      this.uDets = uDets;
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
    this.firebaseService.makeEntryPush(this.recLoc, this.data);
    this.firebaseService.makeEntrySet(this.loc, this.data);
    this.router.navigate(['staff']);
  }

}
