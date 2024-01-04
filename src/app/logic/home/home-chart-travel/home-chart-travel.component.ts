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
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.data = {
            labels: ['Abgerechnete Reisen', 'Offene Reisen', 'Eingereichte Reise'],
            datasets: [
                {
                    data: [4, 1, 3],
                    backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
                }
            ]
        };


        this.options = {
            cutout: '80%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                    position: 'top'
                }
            }
        };
    }
}
