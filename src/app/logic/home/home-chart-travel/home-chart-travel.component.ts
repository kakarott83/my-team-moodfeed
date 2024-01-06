import { Component } from '@angular/core';

@Component({
  selector: 'app-home-chart-travel',
  templateUrl: './home-chart-travel.component.html',
  styleUrl: './home-chart-travel.component.scss'
})
export class HomeChartTravelComponent {
  data: any;

    options: any;

    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--surface-900');

        this.data = {
            labels: ['Abgerechnete Reisen', 'Offene Reisen', 'Eingereichte Reise'],
            datasets: [
                {
                    data: [4, 1, 3],
                    backgroundColor: [documentStyle.getPropertyValue('--cic-dark-blue'), documentStyle.getPropertyValue('--cic-main-blue-500'), documentStyle.getPropertyValue('--cic-main-blue-200')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--cic-main-blue-800'), documentStyle.getPropertyValue('--cic-main-blue-400'), documentStyle.getPropertyValue('--cic-main-blue-100')]
                }
            ]
        };


        this.options = {
            cutout: '80%',
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
            }
        };
    }
}
