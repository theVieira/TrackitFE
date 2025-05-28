import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart-layout',
  imports: [BaseChartDirective, MatCardModule],
  templateUrl: './chart-layout.component.html',
})
export class ChartLayoutComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() configuration!: ChartConfiguration;
  @Input() type!: ChartType;
}
