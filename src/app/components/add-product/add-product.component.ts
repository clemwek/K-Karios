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

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private dateService: DateTimeService
  ) { }

  ngOnInit() {
  }

  submitOrder() {
    let data = {
      name: this.prodName,
      costPUnit: this.costPUnit,
      volume: this.volume
    }

    // To do check if the data is in the database 
    // To do add a success message 

    this.firebaseService.makeEntryPush('record/admin/stockin/'+this.dateService.formatDateString(), data);
    this.firebaseService.makeEntrySet('views/availableStock/'+this.prodName, data);
    this.router.navigate(['admin']);
  }

}
