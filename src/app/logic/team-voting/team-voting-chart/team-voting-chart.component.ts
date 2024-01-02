import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../../services/chart.service';
import { UserService } from '../../../services/shared/user.service';
import { UserData } from '../../../model/user-data';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-team-voting-chart',
  templateUrl: './team-voting-chart.component.html',
  styleUrl: './team-voting-chart.component.scss',
  providers: [ChartService, UserService]
})
export class TeamVotingChartComponent implements OnInit {

  data: any;
  options: any;
  weeks: any;
  isLoading = false;
  year = new Date().getFullYear();
  myUser: any;
  user: any;
  myUserData: UserData = {};
  minDataValue = 0;
  maxDataValue = 6

  constructor(private chartService: ChartService, private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {

    this.user = this.authService.getUserAuth();
    this.myUser = this.userService.getUser();
    this.isLoading = true;
    this.getAdditionalData().then(() => {
    console.log(this.myUserData)
    if(this.myUserData.department !== undefined)
    this.chartService.calcDataSets(this.year, this.myUserData.department)
    .then(
      dataSets => this.createChart(dataSets, this.chartService.getWeeksPerYear(new Date().getFullYear()))
    )
    .then(() => this.isLoading = false)
  });

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
              suggestedMin: this.minDataValue,
              suggestedMax: this.maxDataValue,
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

  setAdditionalData() {
    this.userService.createAdditionalData();
  }

  async getAdditionalData() {
    if(!!this.myUser) {
      await this.userService.getUserData(this.myUser.uid).then((data) => {
        this.myUserData = data[0];
      });
    }
  }




}
