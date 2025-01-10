import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Tech } from '@/@types/tech.type';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatButtonModule, BaseChartDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  protected tech!: Tech;

  protected weekType: ChartType = 'line';
  protected weekData: ChartConfiguration<'line'>['data'] | null = null;
  protected weekLabels: string[] = [
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ];

  protected clientType: ChartType = 'doughnut';
  protected clientLabels: string[] = ['Cliente 01', 'Cliente 02', 'Cliente 03'];
  protected clientData: ChartConfiguration<'doughnut'>['data'] | null = null;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.tech = JSON.parse(localStorage.getItem('tech') ?? '{}');

      this.weekData = {
        labels: this.weekLabels,
        datasets: [
          {
            data: [65, 59, 80, 81, 56, 55],
            label: this.tech.name,
            tension: 1,
            fill: false,
          },
        ],
      };

      this.clientData = {
        labels: this.clientLabels,
        datasets: [
          {
            label: 'Tickets',
            data: [
              Math.floor(Math.random() * 100),
              Math.floor(Math.random() * 100),
              Math.floor(Math.random() * 100),
            ],
          },
        ],
      };
    }
  }
}
