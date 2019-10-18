import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { reject } from 'q';
import * as user from './../user';

@Injectable({
  providedIn: 'root'
})
export class PointService {
  data;
  url = environment.url;
  arr ;
  price:any[];
  constructor(private http: HttpClient) { }

    setPoint(obj) { 
      return new Promise ( (resolve, reject) => {
        this.http.post(`${this.url}/inside/point`, obj).subscribe(res => {
          this.data = res;
        });
      let timer = setInterval(() => {
        if (typeof this.data == "object" ) {
          clearInterval(timer);
          resolve();
        }
      },500 );
      })
     }

     getPoints() {
       return this.data;
     }

     setPrice() {
       this.http.get(`${this.url}/inside/price`).subscribe((res:any[]) => {
         this.price = res;
       })
     }

     getPrice() {
       return this.price
     }

     sendOrder(date, namePoint, listOrder){
       const order = {
         'user': user.user.login,
         'date': date,
         'namePoint': namePoint,
         'listOrder':listOrder
       };
       this.http.post(`${this.url}/inside/order`, order).subscribe(res => {
      
      });

     }
 
}


 