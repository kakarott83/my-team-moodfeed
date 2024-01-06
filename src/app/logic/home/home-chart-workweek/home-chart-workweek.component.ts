import { Component } from '@angular/core';

@Component({
  selector: 'app-home-chart-workweek',
  templateUrl: './home-chart-workweek.component.html',
  styleUrl: './home-chart-workweek.component.scss'
})
export class HomeChartWorkweekComponent {
  data: any;

  options: any;

  ngOnInit() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--surface-900');
      const textColorSecondary = documentStyle.getPropertyValue('--surface-900');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.data = {
          labels: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'],
          datasets: [
              {
                  label: 'Stunden/Tag (Ist)',
                  backgroundColor: documentStyle.getPropertyValue('--cic-dark-blue'),
                  borderColor: documentStyle.getPropertyValue('--cic-dark-blue'),
                  data: [8,8.5,7.5,9,6]
              },
              {
                  label: 'Stunden/Tag (Soll)',
                  backgroundColor: documentStyle.getPropertyValue('--cic-main-blue-500'),
                  borderColor: documentStyle.getPropertyValue('--cic-main-blue-500'),
                  data: [8,8,8,8,8]
              }
        ]
      };

      this.options = {
          indexAxis: 'y',
          maintainAspectRatio: false,
          aspectRatio: 0.8,
          plugins: {
              legend: {
                  labels: {
                      color: textColor,
                      font: {
                        family: "'Rajdhani'",
                        size: 14
                      }
                  },
                  position: 'top'

              }
          },
          scales: {
              x: {
                  ticks: {
                      color: textColorSecondary,
                      font: {
                        family: "'Rajdhani'",
                        size: 14
                      },
                  },
                  grid: {
                      color: surfaceBorder,
                      font: {
                        family: "'Rajdhani'",
                        size: 14
                      },
                      drawBorder: false
                  }
              },
              y: {
                  ticks: {
                      color: textColorSecondary,
                      font: {
                        family: "'Rajdhani'",
                        size: 14
                      },
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
