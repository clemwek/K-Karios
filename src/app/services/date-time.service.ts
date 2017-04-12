import { Injectable } from '@angular/core';

@Injectable()
export class DateTimeService {
  date: any;
  dateString: string;

  constructor() { }

  formatDate() {
    this.date = new Date();

    this.dateString = (this.date.getMonth() + 1) + "/" + this.date.getDate() + "/" + this.date.getFullYear().toString();

    return this.dateString;
  }

  formatDateString() {
    this.date = new Date();

    this.dateString = String((this.date.getMonth() + 1)) + String(this.date.getDate()) + this.date.getFullYear().toString();

    return this.dateString;
  }

  formatYestDateString() {
    let date = new Date();
    date.setDate(date.getDate()-1)

    this.dateString = String((this.date.getMonth() + 1)) + String(this.date.getDate()) + this.date.getFullYear().toString();

    return this.dateString;
  }

}
