import { Component, Input } from '@angular/core';
import { FireService } from '../../../services/fire';
import { UtilitiesService } from '../../../services/shared/utilities.service';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/shared/user.service';
import { DataService } from '../../../services/shared/data.service';

@Component({
  selector: 'app-home-chart-workweek',
  templateUrl: './home-chart-workweek.component.html',
  styleUrl: './home-chart-workweek.component.scss'
})
export class HomeChartWorkweekComponent {
  data: any;

  myUser: any
  weekDays: any
  weekData: any

  options: any;
  loading: boolean = false

  constructor(
    private authService: AuthService, 
    private dataService: DataService) {

    authService.user$.subscribe(data => {
        this.myUser = data
    })
  }

  ngOnInit() {
    //this.createWeek()
    this.loading = true
    this.dataService.wtData$.subscribe(data => {
      if(data) {
        console.log("🚀 ~ HomeChartWorkweekComponent ~ ngOnInit ~ data:", data)
        this.createChart(data)
        this.loading = false
      }
      
    })
    
  }

  createChart(weekData: any) {
    console.log("🚀 ~ HomeChartWorkweekComponent ~ createChart ~ weekData:", weekData)

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
                //data: [8,8,8,8,8] 
                data: weekData
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

  // async createWeek() {
  //   this.loading = true
  //   this.myUser = await this.userService.getAllUserData()
  //   this.weekDays = this.utilities.getWeekDays(7)

  //   let start = this.weekDays[0]
  //   let end = this.weekDays[this.weekDays.length -1]

  //   this.weekData = await this.fire.getWorkTimeHours(this.myUser.uid, start, end);
  //   this.createChart(this.weekData)
  //   this.loading = false
    
  // }


}
