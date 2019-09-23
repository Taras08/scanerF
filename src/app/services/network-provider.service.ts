import { Injectable } from '@angular/core';
import { AlertController, Events } from '@ionic/angular';



export enum ConnectionStatusEnum {
    Online,
    Offline
}


@Injectable()
export class NetworkProvider {

  previousStatus;

  constructor(public alertCtrl: AlertController, 
          
              public eventCtrl: Events) {

    console.log('Hello NetworkProvider Provider');

    this.previousStatus = ConnectionStatusEnum.Online;
    
  }


}
