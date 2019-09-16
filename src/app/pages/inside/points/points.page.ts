import { Component, OnInit, Input } from '@angular/core';
import {PointService} from './point.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-points',
  templateUrl: './points.page.html',
  styleUrls: ['./points.page.scss'],
})
export class PointsPage implements OnInit {
 
  data: Observable<any>;

  constructor(private pointService: PointService) { }

   ngOnInit() {
    this.data = this.pointService.getPoints() ;
   
  }

}
