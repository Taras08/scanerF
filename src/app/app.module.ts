import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import {AuthGuardService} from './services/auth-guard.service';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { Storage, IonicStorageModule} from '@ionic/storage';
import { JwtModule, JWT_OPTIONS} from '@auth0/angular-jwt';
import { HTTP } from '@ionic-native/http/ngx';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';





export function jwtOptionsFacgtory(storage) {
   return {
      tokenGetter: () => {
        return storage.get('access_toen');
      },
      whitelistedDomains: ['http://10.10.4.12:5000']
   }
}
 

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    HttpClientModule,
    HttpModule,
    NgxDatatableModule ,
    IonicStorageModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFacgtory,
        deps: [Storage]
      }
      
    }),

  ],
  providers: [
    HTTP,
    StatusBar,
    SplashScreen,
    AuthGuardService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
