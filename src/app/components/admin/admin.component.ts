import { Component, OnInit } from '@angular/core';
import { DateTimeService } from '../../services/date-time.service';
import { FirebaseService } from '../../services/firebase.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  searchFilter: string;
  availableStock: any;
  addProd: boolean = false;
  volume: number;
  costPUnit: number;
  listProds: any = [];
  statusList: any = [];

  constructor(
    private firebaseService: FirebaseService,
    private dateService:DateTimeService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.firebaseService.getGenView('availableStock').subscribe(availableStock => {
      this.availableStock = availableStock;
      this.availableStock.forEach(element => {
        this.listProds.push(element.name.toLowerCase());
      });
    });

    // console.log(this.dateService.formatDateString())

    this.firebaseService.getList('views/admin/stockBal/'+this.dateService.formatDateString()).subscribe(stockStatus => {
      stockStatus.forEach(element => {
        this.statusList.push(element.name.toLowerCase())
      });
    });
  }

  showForm() {
    this.addProd = !this.addProd;
  }

  submitOrder() {
    let availableEnt = {
      name: '',
      costPUnit: 0,
      volume: 0
    }
    if (this.listProds.indexOf(this.searchFilter.toLowerCase().trim()) === -1) {
      // This is what happens when making the entry for the first time
        availableEnt.name = this.searchFilter.toLowerCase();
        availableEnt.costPUnit = this.costPUnit;
        availableEnt.volume = this.volume;

      let prodStatus = {
        // To do: make this work
      }

      
      // To Do: add making entry to ball 
    } else {
      availableEnt.name = this.searchFilter.toLowerCase();
      availableEnt.costPUnit = this.costPUnit;
      availableEnt.volume = Number(this.volume) + Number(this.availableStock[this.listProds.indexOf(this.searchFilter.toLowerCase().trim())].volume)
      console.log()
    }
    this.firebaseService.makeEntrySet('views/availableStock/'+this.searchFilter.toLowerCase().trim(), availableEnt);
    this.addProd = false;
    this.searchFilter = this.volume = this.costPUnit = null;
  }

}
