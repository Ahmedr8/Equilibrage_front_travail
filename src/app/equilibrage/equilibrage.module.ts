import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquilibrageComponent } from './equilibrage.component';
import { EquilibrageRouteRoutes } from './equilibrage-route.routing';
import { HttpClientModule } from '@angular/common/http';
import { SessionsComponent } from './sessions/sessions.component';
import { DataTablesModule } from 'angular-datatables';
import { PropositionComponent } from './proposition/proposition.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EquilibrageRouteRoutes,
    HttpClientModule,
    DataTablesModule,
    NgxSkeletonLoaderModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
  ],
  declarations: [EquilibrageComponent,SessionsComponent,PropositionComponent]
})
export class EquilibrageModule { }
