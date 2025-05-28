import { Component, Input } from '@angular/core';
import { iTicket } from '@features/ticket/models/ticket.model';
import { ChartConfiguration, ChartType } from 'chart.js';
import { ChartLayoutComponent } from '@widgets/layouts/chart-layout/chart-layout.component';

@Component({
  selector: 'app-served-tickets-chart',
  imports: [ChartLayoutComponent],
  templateUrl: './served-tickets-chart.component.html',
})
export class ServedTicketsChartComponent {
  @Input() tickets!: iTicket[];

  protected type: ChartType = 'line';
  protected configuration: ChartConfiguration<'line'> = {
    type: 'line',
    data: {
      datasets: [{ data: [2, 5, 1, 7, 8, 6, 0], label: 'Técnico 01' }],
      labels: [
        'Segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta',
        'Sábado',
        'Domingo',
      ],
    },
  };
}
