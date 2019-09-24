import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import * as user from '../user';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  url = environment.url;
  data: any;
  objLogin = {
    "login" : "",
    "date" : ""
};
  constructor(private http: HttpClient) { }

  getDocuments (date) {
    user.user["date"] =  date;
    console.log(user.user);
    this.http.post(`${this.url}/inside/document`, user.user).subscribe(
      res => {
        console.log(res);
      }
    );
    // return new Promise ( (resolve, reject) => {
      // this.http.post(`${this.url}/inside/point`, obj).subscribe(res => {
        // this.data = res;
      // });
    // let timer = setInterval(() => {
      // if (typeof this.data == "object" ) {
        // clearInterval(timer);
        // resolve();
      // }
    // },500 );
      // 
    // })
   
   }
}

