import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../../services/chart.service';
import { UserService } from '../../../services/shared/user.service';
import { UserData } from '../../../model/user-data';
import { AuthService } from '../../../services/auth.service';
import { UtilitiesService } from '../../../services/shared/utilities.service';

@Component({
  selector: 'app-team-voting-chart',
  templateUrl: './team-voting-chart.component.html',
  styleUrl: './team-voting-chart.component.scss',
  providers: [ChartService, UserService, UtilitiesService]
})

export class TeamVotingChartComponent implements OnInit {

  data: any;
  options: any;
  plugins: any
  weeks: any;
  isLoading = false;
  year = new Date().getFullYear();
  myUser: any;
  user: any;
  myUserData: UserData = {};
  minDataValue = 0;
  maxDataValue = 6;

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

    const image = new Image();
    image.src = '../../../../assets/images/bg_gradient.png';


    const plugin = {
      id: 'customCanvasBackgroundImage',
      beforeDraw: (chart: any) => {
        if (image.complete) {
          const ctx = chart.ctx;
          const {top, left, width, height} = chart.chartArea;
          const x = left + width / 2 - image.width / 2;
          const y = top + height / 2 - image.height / 2;
          ctx.drawImage(image, x, y);
        } else {
          image.onload = () => chart.draw();
        }
      }
    };


    this.plugins = [plugin],
    this.data = {
      labels: weeks,
      datasets: dataSets
    };
    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        customCanvasBackgroundColor: {
          color: 'none'
        },
          title: {
              //display: true,
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
                  color: 'white',
              },
              grid: {
                  //color: surfaceBorder,
                  drawBorder: false,
                  //display: true
              },
              display: true,
               title: {
                 display: true,
                 text: 'Kalenderwochen',
                 color: 'white'
              }
          },
          y: {
              suggestedMin: this.minDataValue,
              suggestedMax: this.maxDataValue,
              ticks: {
                  color: 'white'
              },
              grid: {
                  //color: surfaceBorder,
                  drawBorder: true,
                  //display: true
              },
              display: true,
               title: {
                 display: true,
                 text: 'Bewertung',
                 color: 'white'
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
