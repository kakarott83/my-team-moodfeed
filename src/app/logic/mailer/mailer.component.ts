import { Component, OnInit } from '@angular/core';
import { mailer } from '../../../environments/mailer'
import { MailService } from '../../services/shared/mail.service';
import { FireService } from '../../services/fire';
import { Travel } from '../../model/travel';
import { get } from 'http';
import { Spend } from '../../model/spend';
import moment from 'moment';

@Component({
  selector: 'app-mailer',
  templateUrl: './mailer.component.html',
  styleUrl: './mailer.component.scss'
})
export class MailerComponent implements OnInit {

  myTravel!: Travel

  constructor(private fire: FireService, private mailService: MailService) { }

  startDate = new Date('01.02.2024').toLocaleDateString();
  endDate = new Date('03.02.2024').toLocaleDateString();
  userName = 'Michael'
  month = 'Januar'


  ngOnInit(): void {
    this.getTravel()
  }


  saveMail() {

    this.createHtmlBody(this.myTravel)


    let htmlContent = this.createHtmlBody(this.myTravel)
    let body = this.createBody(htmlContent);

    this.mailService.sendMail(body);
  }

  createBody(content: string) {
    return {
      receiverName: 'Michael',
      receiver: 'ml@milan-muc.de',
      senderName: 'Micha',
      sender: 'michael@milan-muc.de',
      data: content,//'<h2>test</h2>',
      subject: "Neue Reisekostenabrechnung"
    }
  }

  async getTravel() {
    this.myTravel = await this.fire.getTravelByIdPromise("2fIPUw5LIPGfykBmWq0T");
    console.log("🚀 ~ MailerComponent ~ getTravel ~ myTravel:", this.myTravel)

    if (this.myTravel.spends) this.createTable(this.myTravel.spends)
  }

  /*Convert Spends in HTML*/
  createHtmlSpendContent(dates?: Spend[]) {

    let htmlContent = ``

    dates?.forEach(item => {

      let sDate = moment(new Date(Object(item.date).seconds*1000)).format('DD.MM.yyyy')

      htmlContent += `<li>
      Kosten für <b>${item.type}</b> am <b>${sDate}</b> in Höhe von <b>${item.value}€</b>
      </li>`
    })

    return htmlContent

    //console.log("🚀 ~ MailerComponent ~ createHtmlSpendContent ~ htmlContent:", htmlContent)
  }

  /*Convert Files in HTML*/
  createHtmlFilesContent(files?: any[]) {

    let htmlContent = ``

    files?.forEach(item => {
      htmlContent += `
      <li>
        <a href=${item.url}>${item.name}</a>
      </li>
      `
    })

    //console.log("🚀 ~ MailerComponent ~ createHtmlFilesContent ~ htmlContent:", htmlContent)

    return htmlContent



  }

  createHtmlBody(myTravel: Travel) {
    let spend = this.createHtmlSpendContent(myTravel.spends);
    let files = this.createHtmlFilesContent(myTravel.fileRefs);
    let start = moment(new Date(Object(myTravel.date)[0].seconds*1000)).format('DD.MM.yyyy HH:mm')
    let end = moment(new Date(Object(myTravel.date)[1].seconds*1000)).format('DD.MM.yyyy HH:mm')
    
    let htmlContent = `
    <html>
      <head>
          <style>
              body {
                  font-family: 'Rajdhani', sans-serif;
              }

              table {
                  border-collapse: collapse;
                  width: 100%;
              }

              th,
              td {
                  border: 1px solid #dddddd;
                  text-align: left;
                  padding: 8px;
              }
          </style>
      </head>
      <body>
          <h2>Reisekosten von ${this.userName}</h2>
          <table>
              <tr>
                  <th>Zeitraum</th>
                  <th>Kunde</th>
                  <th>Ort</th>
                  <th>Zweck</th>
                  <th>Ausgaben</th>
                  <th>Belege</th>
              </tr>
              <tr>
                  <td>vom <b>${start}</b> </br> bis <b>${end}</b></td>
                  <td>${myTravel.customer?.name}</td>
                  <td>${myTravel.customer?.city}</td>
                  <td>${myTravel.reason}</td>
                  <td>
                      <ul>
                      ${spend}
                      </ul>
                  </td>
                  <td>
                      <ul>
                      ${files}
                      </ul>
                  </td>
              </tr>
          </table>
      </body>
    </html>

    `
    console.log("🚀 ~ MailerComponent ~ createHtmlBody ~ htmlContent:", htmlContent)
    return htmlContent


  }
    

  createTable(dates?: Spend[]) {
    console.log("🚀 ~ MailerComponent ~ createTable ~ dates:", dates)
    let htmlContent = `
    <html>
      <head>
          <style>
              body {
                  font-family: 'Rajdhani', sans-serif;
              }

              table {
                  border-collapse: collapse;
                  width: 100%;
              }

              th,
              td {
                  border: 1px solid #dddddd;
                  text-align: left;
                  padding: 8px;
              }
          </style>
      </head>
      <body>
          <h2>Reisekosten von ${this.userName} für den Zeitraum vom ${this.startDate} bis zum ${this.endDate}</h2>
          <table>
              <tr>
                  <th>Zeitraum</th>
                  <th>Kunde</th>
                  <th>Ort</th>
                  <th>Zweck</th>
                  <th>Ausgaben</th>
                  <th>Belege</th>
              </tr>
              <tr>
                  <td>vom <b>01.01.2024 08:00</b> </br> bis <b>05.01.2024 17:00</b></td>
                  <td>AIL</td>
                  <td>Grünwald</td>
                  <td>Livegang</td>
                  <td>
                      <ul>
                          <li>
                              Kosten für <b>Auto</b> am <b>02.01.2024</b> in Höhe von <b>50€</b>
                          </li>
                          <li>
                              Kosten für <b>Hotel</b> am <b>04.01.2024</b> in Höhe von <b>120€</b>
                          </li>
                      </ul>
                  </td>
                  <td>
                      <ul>
                          <li>
                              <a href="www.test/def.de">Test</a>
                          </li>
                          <li>
                              <a href="www.test/def.de">Test2</a>
                          </li>
                      </ul>
                  </td>
              </tr>
          </table>
      </body>
    </html>
    `
    return htmlContent
  }

}
