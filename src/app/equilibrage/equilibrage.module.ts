import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquilibrageComponent } from './equilibrage.component';
import { EquilibrageRouteRoutes } from './equilibrage-route.routing';
import { HttpClientModule } from '@angular/common/http';
import { SessionsComponent } from './sessions/sessions.component';
import { DataTablesModule } from 'angular-datatables';
import { PropositionComponent } from './proposition/proposition.component';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EquilibrageRouteRoutes,
    HttpClientModule,
    DataTablesModule,
    NgxSkeletonLoaderModule

  ],
  declarations: [EquilibrageComponent,SessionsComponent,PropositionComponent]
})
export class EquilibrageModule { }
