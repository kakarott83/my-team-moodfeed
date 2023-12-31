import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../../services/chart.service';

@Component({
  selector: 'app-team-voting-chart',
  templateUrl: './team-voting-chart.component.html',
  styleUrl: './team-voting-chart.component.scss',
  providers: [ChartService]
})
export class TeamVotingChartComponent implements OnInit {

  data: any;
  options: any;
  weeks: any;
  isLoading = false;

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {

    this.isLoading = true;
    this.chartService.calcDataSets()
    .then(
      dataSets => this.createChart(dataSets, this.chartService.getWeeksPerYear(new Date().getFullYear()))
    )
    .then(() => this.isLoading = false)

  }

  createChart(dataSets: any, weeks: any) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    const CHART_AREA = true;

    this.data = {
      labels: weeks,
      datasets: dataSets
    };
    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
          customCanvasBackgroundColor: {
            color: 'lightGrey'
          },
          title: {
              display: true,
              text: 'Stimmungsverlauf '+ new Date().getFullYear(),
              position: 'top',
              font: {
                size: 14,
                weight: 'bold'
              }
          },
          legend: {
              labels: {
                  color: 'black'
              },
              position: 'right'
          }
      },
      scales: {
          x: {
              ticks: {
                  color: textColorSecondary,
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: true,
                  display: true
              },
              display: true,
              title: {
                display: true,
                text: 'Kalenderwochen'
              }
          },
          y: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: true,
                  display: true
              },
              display: true,
              title: {
                display: true,
                text: 'Bewertung'
              }
          }
      }
    };
  }



}
