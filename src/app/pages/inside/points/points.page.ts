import { Component, OnInit, Input } from '@angular/core';
import {PointService} from './point.service';
import { Observable } from 'rxjs';
import { AlertController, ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { PointsPopoverComponent } from './points-popover/points-popover.component';
import {PageComponent} from './page/page.component';
@Component({
  selector: 'app-points',
  templateUrl: './points.page.html',
  styleUrls: ['./points.page.scss'],
})
export class PointsPage implements OnInit {
 
  data: Observable<any>;

  constructor(private pointService: PointService,
   private alertController: AlertController,
   private popoverController: PopoverController,
   public modalController: ModalController ) { }

   ngOnInit() {
    this.data = this.pointService.getPoints() ;
   
  }

  async info(ev) {
    const popover = await this.popoverController.create({
      component: PointsPopoverComponent,
      event: ev,
      componentProps: {
        'name': ev.name,
        'typeName': ev.typeName,
        'phone': ev.phone,
        'person': ev.person,
        'adress' : ev.adress,
        'marshrut': ev.marshrut.replace('ћ', '№')
      },
      translucent: true
    });
    return await popover.present();
  } 

  async create(row) {
    console.log(row);
    //this.pointService.createDocument(row);
    const modal = await this.modalController.create({
      component: PageComponent,
      componentProps: {
        'name': row.name,
        
      }
    }
    );
     modal.present();
  }


  async detail(i) {
    const alert = await this.alertController.create({
      header: i.name,
      inputs: [
        {
          name: i.adress,
          type: 'text',
          placeholder: 'Placeholder 1'
        },
        {
          name: 'name2',
          type: 'text',
          id: 'name2-id',
          value: 'hello',
          placeholder: 'Placeholder 2'
        },
        {
          name: 'name3',
          value: 'http://ionicframework.com',
          type: 'url',
          placeholder: 'Favorite site ever'
        },
        // input date with min & max
        {
          name: 'name4',
          type: 'date',
          min: '2017-03-01',
          max: '2018-01-12'
        },
        // input date without min nor max
        {
          name: 'name5',
          type: 'date'
        },
        {
          name: 'name6',
          type: 'number',
          min: -5,
          max: 10
        },
        {
          name: 'name7',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

}
