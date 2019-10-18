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
    const modal = await this.modalController.create({
      component: PageComponent,
      componentProps: {
        'name': row.name,
      }
    }
    );
    return await modal.present();
  }

}
