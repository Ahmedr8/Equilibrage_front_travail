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
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EtabMultiSelectorComponent } from './proposition/etabsLevelComponents/etab-multi-selector/etab-multi-selector.component';


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
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [EquilibrageComponent,SessionsComponent,PropositionComponent, EtabMultiSelectorComponent]
})
export class EquilibrageModule { }
