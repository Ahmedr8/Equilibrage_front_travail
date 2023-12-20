import { Routes, RouterModule } from '@angular/router';
import { SessionsComponent } from './sessions/sessions.component';
import { PropositionComponent } from './proposition/proposition.component';

const routes: Routes = [
  { path: 'sessions', component: SessionsComponent },
  { path: 'add_prop', component: PropositionComponent },
];

export const EquilibrageRouteRoutes = RouterModule.forChild(routes);
