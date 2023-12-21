import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseDataComponent } from './BaseData.component';
import { BaseDataRouteRoutes } from './Base-Data-route.routing';
import { HttpClientModule } from '@angular/common/http';
import { ArticlesComponent } from './Articles/Articles.component';
import { DataTablesModule } from 'angular-datatables';
import { EtablissementComponent } from './Etablissement/Etablissement.component';
import { FormsModule }   from '@angular/forms';
import { StocksComponent } from './stocks/stocks.component';
import { DepotComponent } from './Depot/Depot.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BaseDataRouteRoutes,
    HttpClientModule,
    DataTablesModule
  ],
  declarations: [BaseDataComponent,ArticlesComponent,EtablissementComponent,StocksComponent,DepotComponent]
})
export class BaseDataModule { }
