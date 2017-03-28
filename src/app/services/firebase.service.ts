import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {
  something: any;
  uid: any;
  availableStock: any;
  obj: any;

  constructor(
    private af: AngularFire
  ) {
    this.af.auth.subscribe(auth => {
      // console.log(auth.uid);
      this.uid = auth.uid;
    });
  }

  getSomething() {
    this.something = this.af.database.list('/listings') as FirebaseListObservable<any[]>
    return this.something;
  }

  getGenView(spec) {
    this.availableStock = this.af.database.list('/views/'+spec) as FirebaseListObservable<any[]>

    // console.log(this.uid);
    return this.availableStock;
  }

  getObj(loc) {
    this.obj = this.af.database.object(loc) as FirebaseObjectObservable<any>;
    return this.obj
  }

}
