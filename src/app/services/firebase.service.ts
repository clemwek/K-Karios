import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class FirebaseService {
  something: any;
  constructor(
    private af: AngularFire
  ) { }

  getSomething() {
    this.something = this.af.database.list('/listings') as FirebaseListObservable<any[]>
    return this.something;
  }

}
