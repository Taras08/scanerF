import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import * as user from '../user';
import { Observable, generate } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  url = environment.url;
  data: any;
  documentsArr: any;
  documentArr: any;

  constructor(private http: HttpClient) { }

  public createDocuments (date):any  {
    user.user["date"] =  date;    
    this.http.post(`${this.url}/inside/documents`, user.user).subscribe(res => {
      this.documentsArr = res ;
      })
   }

   public getDocuments(): any  {
     const document =new Observable(observer => {
        setTimeout(() => {
          observer.next(this.documentsArr);
        }, 1000);
     });
     return document;
   }
// передача данних в модальне вікно

public createDocument (row):any  {
  const createdate = row.dateDoc.slice(8,10) + "/" + row.dateDoc.slice(5,7) + "/" + row.dateDoc.slice(0,4)
    
  const data = {
    "row" : ""
  };
  data["row"] = row.number + "#" + createdate;
  this.http.post(`${this.url}/inside/document`, data).subscribe(res => {
    this.documentArr = res ;
    })
 }

 public getDocument(): any  {
  const document =new Observable(observer => {
     setTimeout(() => {
       observer.next(this.documentArr);
     }, 1000);
  });
  return document;
}


}

