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
    console.log(this.chartService.getVotingMain(),'Chart');
    this.weeks = this.chartService.getWeeksPerYear(new Date().getFullYear());
    this.isLoading = true;
    this.chartService.getQuestions().then((sets) => {
      console.log(sets);
      this.isLoading = false;
      this.createChart(sets);
    });
  }

  createChart(dataSets: any) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: this.weeks,
      datasets: dataSets
    };
    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
          legend: {
              labels: {
                  color: textColor
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          },
          y: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          }
      }
    };
  }



}
