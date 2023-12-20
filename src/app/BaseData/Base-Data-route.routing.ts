import { Routes, RouterModule } from '@angular/router';
import { ArticlesComponent } from './Articles/Articles.component';
import { EtablissementComponent } from './Etablissement/Etablissement.component';
import { StocksComponent } from './stocks/stocks.component';
import { DepotComponent } from './Depot/Depot.component';
import { FamilleComponent } from './Famille/Famille.component';

const routes: Routes = [
  { path: 'articles', component: ArticlesComponent },
  { path: 'etabs', component: EtablissementComponent },
  { path: 'stocks', component: StocksComponent },
  { path: 'depots', component: DepotComponent },
  { path: 'familles', component: FamilleComponent },
];

export const BaseDataRouteRoutes = RouterModule.forChild(routes);
