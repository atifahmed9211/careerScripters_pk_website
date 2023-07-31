import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  listOfPackages = [
    {
      id: 1,
      name: "Entry Level",
      description: "For Young Graduators And Freshers",
      services: ["Review & Critique", "Editable & PDF File", "ATS Report with 80%+ score", "Keyword-rich to match job postings", "Choose From 20+ Layouts", "2 Revisions Within 15 days"],
      price: 5000,
      AddOns: [{
        id: 1,
        name: "Cover Letter",
        price: 1500
      },
      {
        id: 2,
        name: "Linkedin",
        price: 3500
      }
      ]
    },
    {
      id: 2,
      name: "Mid Level",
      description: "For Professionals With 3-15 Years Of Experience",
      services: ["Review & Critique", "Editable & PDF File", "ATS Report with 80%+ score", "Keyword-rich to match job postings", "Choose From 20+ Layouts", "4 Revisions Within 15 days"],
      price: 8000,
      AddOns: [{
        id: 1,
        name: "Cover Letter",
        price: 2000
      },
      {
        id: 2,
        name: "Linkedin",
        price: 4000
      },
      {
        id: 3,
        name: "Biography",
        price: 4000
      }
      ]
    },
    {
      id: 3,
      name: "Executive Level",
      description: "For Executive Professionals With 15+ Years Of Experience",
      services: ["Review & Critique", "Editable & PDF File", "ATS Report with 80%+ score", "Keyword-rich to match job postings", "Choose From 20+ Layouts", "6 Revisions Within 15 days"],
      price: 12000,
      AddOns: [{
        id: 1,
        name: "Cover Letter",
        price: 2500
      },
      {
        id: 2,
        name: "Linkedin",
        price: 5000
      },
      {
        id: 3,
        name: "Executive Biography",
        price: 5000
      }
      ]
    }
  ]

  Account_detail = {
    EasyPaisa: "Easy123",
    JazzCash: "Jazz123",
    HBL: "HBL123",
    Alfalah: "Alfalah123"
  }
  constructor(
    public http: HttpClient
  ) { }

  validateEmail(email) {
    return this.http.get<{ status: string }>(
      "https://isitarealemail.com/api/email/validate",
      {
        params: { email: email },
        headers: {
          Authorization: "Bearer 48369ba3-266f-4292-8d52-c288b01c85a5",
        },
      })
  }
  sendMessage(userData) {
    var headers = {
      "accept": "application/json",
      "api-key": "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",
      "content-type": "application/json"
    }
    var data = {
      sender: {
        name: userData.name,
        email: userData.email
      },
      to: [
        {
          email: 'atif.ahmed9211@gmail.com'
        },
        // {
        //   email: 'careerscripters@gmail.com'
        // },
      ],
      subject: userData.subject,
      htmlContent: userData.message + "<br/><br/>Received From CareerScripters.pk"
    }
    this.sendMessageToUser(userData,headers).subscribe((res)=>{
      console.log();
    })
    return this.http.post('https://api.sendinblue.com/v3/smtp/email', data, { headers: headers })
  }
  sendMessageToUser(userData,headers)
  {
    var data = {
      sender: {
        name: "Career Scripters",
        email: "careerscripters@gmail.com"
      },
      to: [
        {
          email:userData.email
        }
      ],
      subject: userData.subject,
      htmlContent: userData.message + "<br/><br/>Received From CareerScripters.pk"
    }
    return this.http.post('https://api.sendinblue.com/v3/smtp/email', data, { headers: headers })
  }
}
