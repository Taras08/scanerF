import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-points-popover',
  templateUrl: './points-popover.component.html',
  styleUrls: ['./points-popover.component.scss'],
})
export class PointsPopoverComponent implements OnInit {
@Input() name: string; 
@Input() typeName: string; 
@Input() phone: string; 
@Input() person: string; 
@Input() adress: string; 
@Input() marshrut: string; 
  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  closePopover() {
    this.popoverController.dismiss();
  }
}
