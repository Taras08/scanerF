import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import {DataResolverService} from '../data-resolver.service';
import { IonicModule } from '@ionic/angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { PointsPage } from './points/points.page';
import { InsidePage } from './inside.page';
import {DocumentsPage} from './documents/documents.page';
import {DocumentPage} from './documents/document/document.page';
import { PointsPopoverComponent} from './points/points-popover/points-popover.component'; 
import {PageComponent} from './points/page/page.component';
const routes: Routes = [
  { path: '', component: InsidePage , pathMatch: 'prefix'},
  { path: 'point', component : PointsPage},
  { path: 'documents', component : DocumentsPage},
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
    NgxDatatableModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [DocumentPage,
  PointsPopoverComponent,PageComponent],
  declarations: [InsidePage, PointsPage,PointsPopoverComponent,PageComponent, DocumentsPage,DocumentPage]
})
export class InsidePageModule {}
