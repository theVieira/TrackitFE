import { Routes } from '@angular/router';
import { HomeComponent } from '@/pages/home/home.component';
import { SignInComponent } from '@/pages/sign-in/sign-in.component';
import { UnauthorizedComponent } from '@/pages/unauthorized/unauthorized.component';
import { TicketsListComponent } from '@/pages/tickets/tickets-list/tickets-list.component';
import { TicketDetailsComponent } from '@/pages/tickets/ticket-details/ticket-details.component';
import { SidenavComponent } from '@/layouts/sidenav/sidenav.component';
import { ClientsListComponent } from '@/pages/clients/clients-list/clients-list.component';
import { ClientDetailsComponent } from '@/pages/clients/client-details/client-details.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CreateNewTicketComponent } from './pages/tickets/create-new-ticket/create-new-ticket.component';
import { CreateNewClientComponent } from './pages/clients/create-new-client/create-new-client.component';
import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings.component';

export const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'unauthorized',
        component: UnauthorizedComponent,
      },
      {
        path: 'tickets',
        component: TicketsListComponent,
      },
      {
        path: 'ticket/:id',
        component: TicketDetailsComponent,
      },
      {
        path: 'clients',
        component: ClientsListComponent,
      },
      {
        path: 'client/:id',
        component: ClientDetailsComponent,
      },
      {
        path: 'not-found',
        component: NotFoundComponent,
      },
      {
        path: 'create-new-ticket',
        component: CreateNewTicketComponent,
      },
      {
        path: 'create-new-client',
        component: CreateNewClientComponent,
      },
      {
        path: 'profile',
        component: ProfileSettingsComponent,
      },
    ],
  },

  { path: 'sign-in', component: SignInComponent },
  { path: '**', redirectTo: 'not-found' },
];
