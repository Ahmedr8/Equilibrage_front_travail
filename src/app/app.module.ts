import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { FormsModule } from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import { DatePipe } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationInterceptor } from './notification.interceptor';
@NgModule({
  declarations: [	
    AppComponent,
      SideNavigationComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: NotificationInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
