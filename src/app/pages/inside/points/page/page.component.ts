import { Component, OnInit, Input, Predicate } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PointService } from './../point.service';
import { from, Observable } from 'rxjs';
import { filter, first, map} from 'rxjs/operators';
import { ColumnMode } from '@swimlane/ngx-datatable';
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
 addPrice$:   Array<object> = [];
 counter: Observable<number>;
 ColumnMode = ColumnMode;
  tablestyle = 'bootstrap';
  customRowClass = false;
  listPrice: any[];
  customOptions: any = {
    cssClass:'dropdown'
  };
 availabilityProductType: boolean = true; 
 date : string  = this.minDate.getFullYear() + "-" + (this.minDate.getMonth() + 1) + "-" + (this.minDate.getDate() + 1);
 constructor( private modalController: ModalController,
              private pointService: PointService) { }

  ngOnInit() {
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

  addTovarinPrice(event$) {
   const price = from(event$.detail.value);
   let arrPrice : Array<object> = [];
   if (this.addPrice$.length > 0 ) {
      arrPrice = this.addPrice$.slice();
   }
   price.forEach(element => {
    let chekArr = arrPrice.find(el => el['tov-nam'] == element );
    if (chekArr == undefined) {
      let a =  this.priceAll.find(el => el['tov-nam'] == element );
      a.count = 1;
      a.amount = a.count * a.cena;
      arrPrice.push(a);
    }
    
   });
   this.addPrice$ = arrPrice;
 
  }
  
  onSelectBlue($event, row) {
    row.count = $event.detail.value;
    row.amount = (row.count * row.cena).toFixed(2) ;
  }

  deleteRow(row) {
    let tovar = row['tov-nam'];
    this.addPrice$ = this.addPrice$.filter(el => el['tov-nam'] !== tovar) ;
  }

  createOrder() {
   let a =  this.pointService.sendOrder(this.date, this.name, this.addPrice$); 
   this.modalController.dismiss() ;
  }
  
}