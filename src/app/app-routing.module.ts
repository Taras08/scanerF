import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { PointPage } from './pages/inside/point/point.page';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  
  { 
    path: 'inside', 
    loadChildren: './pages/inside/inside.module#InsidePageModule',
    canActivate: [AuthGuardService]     
  },
    // { path: 'inside/point', 
    // loadChildren: './pages/inside/point/point.module#PointPageModule' ,
    // canActivate: [AuthGuardService]     
  // },
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
