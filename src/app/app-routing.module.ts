import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'base_data',
    loadChildren: () => import('./BaseData/BaseData.module').then((m) => m.BaseDataModule)
  },
  {
    path: 'equilibrage',
    loadChildren: () => import('./equilibrage/equilibrage.module').then((m) => m.EquilibrageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
