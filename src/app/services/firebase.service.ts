import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {
  something: any;
  uid: any;
  availableStock: any;
  obj: any;
  retList: FirebaseListObservable<any>;
  serve: any;
  listRet: FirebaseListObservable<any>;

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
    return this.availableStock;
  }

  getGenList(spec) {
    this.listRet = this.af.database.list(spec) as FirebaseListObservable<any[]>
    return this.listRet;
  }

  getList(loc) {
    this.retList = this.af.database.list(loc, { query: {
       equalTo: this.uid
    }
    }) as FirebaseListObservable<any>
    return this.retList;
  }


  getObj(loc) {
    this.obj = this.af.database.object(loc) as FirebaseObjectObservable<any>;
    return this.obj
  }

  makeEntrySet(loc, data) {
    firebase.database().ref(loc).set(data);
  }

  makeEntryPush(loc, data) {
    firebase.database().ref(loc).push(data);
  }

  updateData(loc, data) {
    firebase.database().ref(loc).update(data);
  }

  delObj(loc) {
    firebase.database().ref(loc).remove();
  }
}
