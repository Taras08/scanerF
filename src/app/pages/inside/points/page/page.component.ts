import { Component, OnInit, Input, Predicate } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PointService } from './../point.service';
import { Observable, from } from 'rxjs';
import { filter, map} from 'rxjs/operators';


import * as price from './../../price';
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {
 @Input() name: string;
 minDate = new Date();
 typePrice$ = price.price;
 priceAll: any[];
 price$: any[];
 availabilityProductType: boolean = true; 
 date : string  = this.minDate.getFullYear() + "-" + (this.minDate.getMonth() + 1) + "-" + (this.minDate.getDate() + 1);
 constructor( private modalController: ModalController,
              private pointService: PointService) { }

  ngOnInit() {
    console.log('sss');
    this.priceAll = this.pointService.getPrice();
    this.onChange()
  }

  closeDocument() {
    this.modalController.dismiss() ;
    }

    onChange(event$?) {
      (event$ == undefined) ? this.filterPrice('11') : this.filterPrice(event$.detail.value);
       
}
  filterPrice(codePrice) {
     const price = from(this.priceAll);
     let arrPrice : Array<object> = [];
     price.pipe(filter(res => res.tovar.indexOf(codePrice) == 0 )).
           subscribe((res) => (
     arrPrice.push(res)
      ) );
   (arrPrice.length > 0) ? this.availability(arrPrice) : this.notAvailability(); 
   
  }

  availability(arrPrice) {
    this.availabilityProductType = true;
    this.price$ = arrPrice;
  };

  notAvailability() {
    this.availabilityProductType = false;
  }


  firstPrice(){
    const price = from(this.priceAll);
     let arrPrice : Array<object> = [];
     price.pipe(filter(res => res.tovar !== undefined )).
           subscribe((res) => (
     arrPrice.push(res)
      ) );
   this.price$ = arrPrice; 
  } 

  test(event$) {
    console.log(event$);
  }
    

}