import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import {DataResolverService} from '../data-resolver.service';

import { IonicModule } from '@ionic/angular';
import { PointsPage } from './points/points.page';
import { InsidePage } from './inside.page';


const routes: Routes = [
  { path: '', component: InsidePage , pathMatch: 'prefix'},
  { path: 'point', component : PointsPage},
  { 
    path: 'point/:id',
    resolve:{
    special: DataResolverService
   },
   component : PointsPage}
];
  
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InsidePage, PointsPage]
})
export class InsidePageModule {}
