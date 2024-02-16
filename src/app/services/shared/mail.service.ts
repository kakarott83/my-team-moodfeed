import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Travel } from '../../model/travel';
import { Spend } from '../../model/spend';
import moment from 'moment';
import { UserData } from '../../model/user-data';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class MailService {

  url = 'http://localhost:5000/api/sendMail'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
  }

  constructor(private http: HttpClient) { }

  sendMail(travels: Travel[], user: any) {

    let content = this.createMail(travels, user)

    const mail = {
        receiverName: 'Verwaltung',
        receiver: 'michael.lange@cic-software.de',
        senderName: 'Micha',
        sender: 'michael@milan-muc.de', /*Sender is fix*/
        copy: 'michael@milan-muc.de',
        data: content, //'<h2>test</h2>',
        subject: "Neue Reisekostenabrechnung"
    }

    return firstValueFrom(this.http.post(this.url, mail, this.httpOptions))
  }

  createMail(travels: Travel[], user: UserData) {
    //console.log("🚀 ~ MailService ~ createMail ~ user:", user)
    //console.log("🚀 ~ MailService ~ createMail ~ travels:", travels)

    let htmlContentTable = this.createTable(travels)

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
          <h2>Reisekosten von ${user.name}</h2>
          <table>
              <tr>
                  <th>Zeitraum</th>
                  <th>Kunde</th>
                  <th>Ort</th>
                  <th>Zweck</th>
                  <th>Ausgaben</th>
                  <th>Belege</th>
                  <th>Kommentar</th>
              </tr>
              ${htmlContentTable}
          </table>
          <br>
          <div>Vielen Dank und schöne Grüße</div>
          <div>${user.name}</div>
      </body>
    </html>

    `

    //console.log("🚀 ~ MailService ~ createMail ~ htmlContent:", htmlContent)

    // if(htmlContent.length > 0) {
    //   let test1 = `{"message":${JSON.stringify(htmlContent)}}`
    //   console.log("🚀 ~ MailService ~ createMail ~ test1:", test1)
      
    //   let test = 'test'
    //   this.sendMail(test1)
    // }

    return htmlContent
      

    

  }

  createTable(travels: Travel[]) {

    let htmlContentTravel = ''
    let htmlContentSpend = ''
    let htmlConentFiles = ''
    
    travels.forEach(item => {
      let start = moment(new Date(Object(item.date)[0].seconds*1000)).format('DD.MM.yyyy HH:mm')
      let end = moment(new Date(Object(item.date)[1].seconds*1000)).format('DD.MM.yyyy HH:mm')

      htmlContentSpend = this.createHtmlSpendContent(item.spends)
      htmlConentFiles = this.createHtmlFilesContent(item.fileRefs)

      htmlContentTravel += `
      <tr>
        <td>vom <b>${start}</b> </br> bis <b>${end}</b></td>
        <td>${item.customer?.name}</td>
        <td>${item.customer?.city}</td>
        <td>${item.reason?.name}</td>
        <td>
          <ul>
          ${htmlContentSpend}
          </ul>
        </td>
          <td>
          <ul>
          ${htmlConentFiles}
          </ul>
        </td>
        <td>${item.comment}</td>
      </tr>
      `
    })

    //console.log("🚀 ~ MailService ~ createTable ~ htmlContentTravel:", htmlContentTravel)

    return htmlContentTravel
  }

  /*Convert Spends in HTML*/
  createHtmlSpendContent(dates?: Spend[]) {

    let htmlContent = ``

    dates?.forEach(item => {

      let sDate = moment(new Date(Object(item.date).seconds*1000)).format('DD.MM.yyyy')

      htmlContent += `<li>
      Kosten für <b>${item.type?.name}</b> am <b>${sDate}</b> in Höhe von <b>${item.value}€</b>
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

}
