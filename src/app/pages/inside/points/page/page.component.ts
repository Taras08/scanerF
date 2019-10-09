import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {
 @Input() name: string;
 minDate = new Date();
 date : string  = this.minDate.getFullYear() + "-" + (this.minDate.getMonth() + 1) + "-" + (this.minDate.getDate() + 1);
 constructor( private modalController: ModalController) { }

  ngOnInit() {
    
console.log(this.date);
  }

  closeDocument() {
    this.modalController.dismiss() ;
    }
}
