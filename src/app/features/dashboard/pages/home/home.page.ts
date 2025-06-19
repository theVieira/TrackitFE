import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ServedClientsWidget } from './widgets/charts/served-clients/served-clients-chart.component';
import { ServedTicketsWidget } from './widgets/charts/served-tickets/served-tickets.widget';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, ServedClientsWidget, ServedTicketsWidget],
  templateUrl: './home.page.html',
})
export class HomePage {}
