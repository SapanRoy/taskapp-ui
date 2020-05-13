// core modules
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from './modules/angular-material-design/angular-material-design.module';
// core services
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// components
import { AppComponent } from './app.component';
// services
import { InterceptedHttpService } from './services/intercepted.http.service';

// custom modules
import { SharedModule } from './modules/shared/shared.module';
import { CardListModule } from './modules/card-list/card-list-module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    SharedModule,
    CardListModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptedHttpService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
