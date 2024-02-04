import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  sendMail(body: any) {
    try {
      this.http.post(this.url, body, this.httpOptions).subscribe(data => {
        console.log("🚀 ~ MailService ~ this.http.post ~ data:", data)
      })
    } catch(err) {
      console.log("🚀 ~ MailService ~ sendMail ~ err:", err)
    }
  }

}
