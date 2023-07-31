import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  all_packages;
  emailexist = true;
  display_loading = false;
  contact_form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl(),
    message: new FormControl('', [Validators.required])
  })
  constructor(
    public homeService: HomeService
  ) {
  }

  ngOnInit(): void {
    this.scrollToTop();
    this.all_packages = this.homeService.listOfPackages;
  }
  scrollToTop() {
    window.scrollTo(0, 0);
  }
  get name() {
    return this.contact_form.get('name');
  }
  get email() {
    return this.contact_form.get('email');
  }
  get message() {
    return this.contact_form.get('message');
  }
  sendMessage() {
    this.display_loading = true;
    if (!(this.contact_form.value.subject)) {
      this.contact_form.value.subject = this.contact_form.value.name;
    }
    let data = this.contact_form.value;
    //verify email exist or not
    this.homeService.validateEmail(this.contact_form.value.email).subscribe((res) => {
      if (res) {
        this.display_loading = false;
        if (res.status == "valid") {
          this.emailexist = true;
          //to empty form values on submit
          this.contact_form.reset();
          this.homeService.sendMessage(data).subscribe((res) => {
            console.log();
          })
        }
        else {
          this.emailexist = false;
        }
      }
    })
  }
  resetError() {
    this.emailexist = true;
  }
}
