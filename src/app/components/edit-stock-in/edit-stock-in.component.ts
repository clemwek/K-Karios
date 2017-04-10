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
      
    } ); 
  }

    submitOrder() {
      this.addVolume ?  this.stock.volume += this.addVolume : this.volume;
      this.stock.costPUnit = this.costPUnit;
      // this.firebaseService.makeEntryPush(this.recLoc, this.data);
      this.firebaseService.makeEntrySet('views/availableStock/'+this.id, this.stock);
      this.router.navigate(['admin']);
    }

}
