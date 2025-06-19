import { Component } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { ChartLayout } from '@widgets/layouts/chart/chart.layout';

@Component({
  selector: 'app-served-clients-chart',
  imports: [ChartLayout],
  templateUrl: './served-clients-chart.component.html',
})
export class ServedClientsWidget {
  protected type: ChartType = 'doughnut';
  protected configuration: ChartConfiguration<'doughnut', number[], unknown> = {
    type: 'doughnut',
    data: {
      datasets: [{ data: [2, 3, 5, 1], label: 'Chamados' }],
      labels: ['Cliente 01', 'Cliente 02', 'Cliente 03', 'Cliente 04'],
    },
  };
}
