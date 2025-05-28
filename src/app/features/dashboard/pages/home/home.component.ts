import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ServedClientsChartComponent } from './widgets/served-clients-chart/served-clients-chart.component';
import { ServedTicketsChartComponent } from './widgets/served-tickets-chart/served-tickets-chart.component';

@Component({
  selector: 'app-home',
  imports: [
    MatCardModule,
    ServedClientsChartComponent,
    ServedTicketsChartComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
