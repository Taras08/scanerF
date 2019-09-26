import { Component, OnInit } from '@angular/core';
import {DocumentsService} from './documents.service';
import { AlertController } from '@ionic/angular'
import { ModalController } from '@ionic/angular';
import { DocumentPage } from './document/document.page';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {

Date: any ;
private documents :any[] ;  
tablestyle = 'bootstrap';
customRowClass = false;
customPickerOption: any;

  constructor(private documentService: DocumentsService,
              private alertCtrl: AlertController,
              public modalController: ModalController) {
    this.customPickerOption = {
      buttons: [{
        text: 'Зберегти',
        handler: (date: any) => {
         this.Date = date.day.value + "/" + date.month.value + "/" + date.year.value;
         this.documentService.createDocuments(this.Date);
         const documentObservable = this.documentService.getDocuments();
         documentObservable.subscribe((doc)=>{
           this.documents = doc;
         })
        }
      }, {
        text: 'Вихід',
        role: 'cancel'
  
      }],
      columns:[
      ]
    };
   
   }

  ngOnInit() {
  }

 
  getRowClass(row) {
    const isMale = row.gender == 'male';
    if (!this.customRowClass) {
      return {};
    }
    return {
      'male-row': isMale,
      'female-row': !isMale
    }
  }

  async open(row) {
    this.documentService.createDocument(row);
    const modal = await this.modalController.create({
      component: DocumentPage,
      componentProps: {
        'client': row.client,
      }
    });
     modal.present();
  }
  

}
