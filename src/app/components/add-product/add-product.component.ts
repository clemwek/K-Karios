import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { DateTimeService } from '../../services/date-time.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  prodName: string;
  volume: number;
  costPUnit: number;
  prodEndtered: any;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private dateService: DateTimeService
  ) { }

  ngOnInit() {
  }

  submitOrder() {
    this.firebaseService.getObj('/views/availableStock/'+this.prodName).subscribe(prodEndtered => {
      console.log(prodEndtered)
      this.prodEndtered = prodEndtered
    });

    console.log(this.prodEndtered);
    // if (!prodEndtered.name) {
      let data = {
        name: this.prodName,
        costPUnit: this.costPUnit,
        volume: this.volume
      }

      let prodStatus = {
        name: this.prodName,
        balCost: (this.costPUnit * this.volume),
        balVolume: this.volume,
        inCost: (this.costPUnit * this.volume),
        inVolume: this.volume,
        outCost: 0,
        outVolume: 0
      }
      // To do check if the data is in the database 
      // To do add a success message 
      // console.log('this is a new entry');
      this.firebaseService.makeEntryPush('record/admin/stockin/'+this.dateService.formatDateString(), data);
      this.firebaseService.makeEntrySet('views/availableStock/'+this.prodName, data);
      this.firebaseService.makeEntrySet('views/admin/stockStatus/'+this.dateService.formatDateString()+'/'+this.prodName, prodStatus);
      this.router.navigate(['admin']);
    // } else {
    //   console.log('The entry is already made');
    //   this.router.navigate(['admin']);
    // }
  }

}
