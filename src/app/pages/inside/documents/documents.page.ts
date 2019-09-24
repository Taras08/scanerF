import { Component, OnInit } from '@angular/core';
import {DocumentsService} from './documents.service';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {
Date: any ;
customPickerOption: any;
  constructor(private documentService: DocumentsService) {
    this.customPickerOption = {
      buttons: [{
        text: 'Зберегти',
        handler: (date: any) => {
         this.Date = date.day.value + "/" + date.month.value + "/" + date.year.value;
          this.documentService.getDocuments(this.Date);
          
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

  

}
