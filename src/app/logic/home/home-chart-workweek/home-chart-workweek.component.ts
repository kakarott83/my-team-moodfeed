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
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = 'white';
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.data = {
          labels: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'],
          datasets: [
              {
                  label: 'Stunden/Tag',
                  backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                  borderColor: documentStyle.getPropertyValue('--blue-500'),
                  data: [8,8.5,7.5,9,6]
              },
              {
                  label: 'Stunden/Tag',
                  backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                  borderColor: documentStyle.getPropertyValue('--pink-500'),
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
                      color: textColor
                  },
                  position: 'top'

              }
          },
          scales: {
              x: {
                  ticks: {
                      color: textColorSecondary,
                      font: {
                          weight: 500
                      }
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
