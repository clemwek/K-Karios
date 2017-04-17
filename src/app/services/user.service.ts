import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  constructor() { }

  checkUser(id) {
    console.log(id)
  }

}
