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
  dayStatusList: any = [];
  daybal: any;
  bal: any;

  constructor(
    private firebaseService: FirebaseService,
    private dateService:DateTimeService,
    private userService: UserService
  ) { }

  ngOnInit() {
    // Get all available products and save to array
    this.firebaseService.getGenView('availableStock').subscribe(availableStock => {
      this.availableStock = availableStock;
      this.availableStock.forEach(element => {
        this.listProds.push(element.name.toLowerCase());
      });
    });

    // get daily balance and save to array
    this.firebaseService.getList('views/admin/stockBal/'+this.dateService.formatDateString()).subscribe(stockStatus => {
      this.daybal = stockStatus;
      stockStatus.forEach(element => {
        this.dayStatusList.push(element.name.toLowerCase());
      });
    });

    // Get balance track 
    this.firebaseService.getList('views/admin/stockBal/track').subscribe(stockStatus => {
      this.bal = stockStatus;
      stockStatus.forEach(element => {
        this.statusList.push(element.name.toLowerCase());
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
    
    let saveData;
    if (this.listProds.indexOf(this.searchFilter.toLowerCase().trim()) === -1) {
      // This is what happens when making the entry for the first time
      availableEnt.name = this.searchFilter.toLowerCase();
      availableEnt.costPUnit = this.costPUnit;
      availableEnt.volume = this.volume;

      saveData = this.makeEntryToBal ();
    } else {
      availableEnt.name = this.searchFilter.toLowerCase();
      availableEnt.costPUnit = this.costPUnit;
      availableEnt.volume = Number(this.volume) + Number(this.availableStock[this.listProds.indexOf(this.searchFilter.toLowerCase().trim())].volume)
      
      saveData = this.makeEntryToBal ();
    }
    this.firebaseService.makeEntryPush('record/admin/stockin/'+this.dateService.formatDateString(), availableEnt);
    this.firebaseService.makeEntrySet('views/admin/stockBal/'+this.dateService.formatDateString()+'/'+this.searchFilter.toLowerCase().trim(), saveData);
    this.firebaseService.makeEntrySet('views/admin/stockBal/track/'+this.searchFilter.toLowerCase().trim(), saveData);
    this.firebaseService.makeEntrySet('views/availableStock/'+this.searchFilter.toLowerCase().trim(), availableEnt);

    this.addProd = false;
    this.searchFilter = this.volume = this.costPUnit = null;
  }

  makeEntryToBal () {
    let prodStatus = {
      name: this.searchFilter,
      date: this.dateService.formatDate(),
      balVol: 0,
      balCost: 0,
      inVol: 0,
      inCost:  0,
      outVol: 0,
      outCost: 0
    }
    if (this.dayStatusList.indexOf(this.searchFilter.toLowerCase().trim()) === -1) {
      if (this.statusList.indexOf(this.searchFilter.toLowerCase().trim()) === -1) {
        // This is new entry
        prodStatus.balVol = this.volume;
        prodStatus.balCost = (this.volume * this.costPUnit);
        prodStatus.inVol = this.volume;
        prodStatus.inCost = (this.volume * this.costPUnit);
      } else {
        // This is for a new day
        let thisObj = this.bal[this.statusList.indexOf(this.searchFilter.toLowerCase().trim())];

        prodStatus.balVol = Number(thisObj.balVol) + Number(this.volume);
        prodStatus.balCost = Number(thisObj.balCost) + Number(this.volume * this.costPUnit);
        prodStatus.inVol = Number(this.volume);
        prodStatus.inCost = Number(this.volume * this.costPUnit);
        prodStatus.outVol = thisObj.outVol;
        prodStatus.outCost = thisObj.outCost;
      }
    } else {
      let thisObj = this.daybal[this.statusList.indexOf(this.searchFilter.toLowerCase().trim())];

      prodStatus.balVol = Number(thisObj.balVol) + Number(this.volume);
      prodStatus.balCost = Number(thisObj.balCost) + Number(this.volume * this.costPUnit);
      prodStatus.inVol = Number(thisObj.inVol) + Number(this.volume);
      prodStatus.inCost = Number(thisObj.inCost) + Number(this.volume * this.costPUnit);
      prodStatus.outVol = thisObj.outVol;
      prodStatus.outCost = thisObj.outCost;
    }
    return prodStatus;
  }
}
