import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { PointPage } from './point/point.page';
import { InsidePage } from './inside.page';

const routes: Routes = [
  { path: '', component: InsidePage},
  { path: 'point', component : PointPage}
];
  
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InsidePage, PointPage]
})
export class InsidePageModule {}
