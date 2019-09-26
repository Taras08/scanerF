import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import {DocumentsService} from '../documents.service';


@Component({
  selector: 'app-document',
  templateUrl: './document.page.html',
  styleUrls: ['./document.page.scss'],
})
export class DocumentPage implements OnInit {
  @Input() client: string;

  private document :any[] ;  
  customRowClass = false;
  tablestyle = 'bootstrap';

  constructor(private navParams: NavParams,
    private documentService: DocumentsService,
    private modalController: ModalController) {
      
     }

  ngOnInit() {
    const documentObservable = this.documentService.getDocument();
    documentObservable.subscribe((doc: any[])=>{        
    this.document = doc;
     
    })
  }

  closeDocument() {
  this.modalController.dismiss({
    'dismissed': false
  })   ;
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

}
