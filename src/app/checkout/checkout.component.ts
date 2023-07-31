import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../services/home.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderConfirmationComponent } from '../order-confirmation/order-confirmation.component';
import { BsModalService,BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  list_of_services;
  pkg_price;
  tax;
  package_name;
  package_description;
  choose_correct_billing_option = false;
  Add_ons = false;
  listOfSelectedAddOns = [];
  total_price_without_tax;
  AddOns_list;
  showInvoice = false;
  emailexist = true;
  display_loading = false;
  bsModalRef: BsModalRef;
  bill_method = {
    name: "",
    account_number: ""
  }
  userInfo_form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone_no: new FormControl('', [Validators.required]),
  })

  constructor(
    private route: ActivatedRoute, 
    public homeService: HomeService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.scrollToTop()
  }
  scrollToTop() {
    window.scrollTo(0, 0);
    this.buyNow();
  }
  buyNow() {
    let all_packages = this.homeService.listOfPackages;
    for (let pkg of all_packages) {
      let SeclectedPackageId = this.route.snapshot.paramMap.get('id')
      if (pkg.id == parseInt(SeclectedPackageId)) {
        this.package_name = pkg.name;
        this.package_description = pkg.description;
        this.list_of_services = pkg.services;
        this.pkg_price = pkg.price;
        this.total_price_without_tax = this.pkg_price;
        this.AddOns_list = pkg.AddOns;
        this.calculateTax();
      }
    }
  }
  billOption(e) {
    if (e.target.value != 0) {
      let selected_option = e.target.value;
      this.bill_method.name = e.target.value;
      this.bill_method.account_number = this.homeService.Account_detail[selected_option];
      this.choose_correct_billing_option = true;
    }
    else {
      this.choose_correct_billing_option = false;
    }
  }
  updateCart(id, btn) {
    btn.disabled = true;
    this.Add_ons = true;
    for (let item of this.AddOns_list) {
      if (item.id == id) {
        this.listOfSelectedAddOns.push(item);
        this.total_price_without_tax += item.price;
        this.calculateTax();
      }
    }
  }
  calculateTax() {
    this.tax = this.total_price_without_tax * 0.05;
  }
  removeAddOns(index, btn, id) {
    this.listOfSelectedAddOns.splice(index, 1);
    for (let item of this.AddOns_list) {
      if (item.id == id) {
        this.total_price_without_tax -= item.price;
        this.calculateTax();
      }
    }
    let button = document.getElementById(btn) as HTMLButtonElement;
    button.disabled = false;
  }
  Invoice() {
    this.showInvoice = true;
  }
  Date() {
    let date = new Date();
    let currentDate = date.getDate();
    let currentMonth = date.getMonth() + 1; //As January is 0.
    let currentYear = date.getFullYear();
    return currentDate + "/" + currentMonth + "/" + currentYear;
  }
  get name() {
    return this.userInfo_form.get('name');
  }
  get email() {
    return this.userInfo_form.get('email');
  }
  get phone_no() {
    return this.userInfo_form.get('phone_no');
  }
  //these functions are using to generate content which we will send user on email
  getlistOfSelectedAddOns() {
    let list;
    for (let item of this.listOfSelectedAddOns) {
      if (list == null) {
        list = "<tr><td colspan='4' style='padding:15px'><strong>AddOns</strong></td></tr><tr><td colspan='3' style='padding:15px'>" + item.name + "</td><td style='padding:15px'>RS." + item.price + "</td></tr>";
      }
      else {
        list += "<tr><td colspan='3' style='padding:15px'>" + item.name + "</td><td style='padding:15px'>RS." + item.price + "</td></tr>";
      }
    }
    return list;
  }
  caculateTotalPrice(a, b) {
    return a + b;
  }
  sendMessage() {
    this.display_loading = true;
    this.userInfo_form.value.subject = this.userInfo_form.value.name;
    let data = {
      name: this.userInfo_form.value.name,
      email: this.userInfo_form.value.email,
      subject: "Subject",
      message: "<div><div><h2>Billing Detail</h2><div>please transfer your amount into our" +
        this.bill_method.name + "Account holding account number " +
        this.bill_method.account_number + "and share the screenshot with us on whatsapp number 032323232332.</div><hr><div><div> \
        <table border='1' style='width:100%;border-collapse:collapse'><thead style='background-color: #019267;color:white;'><tr><th style='padding:15px'>Billed To</th><th style='padding:15px'>Payment Method</th><th style='padding:15px'>Order Date</th></tr></thead><tbody style='text-align:center;background-color: #cdeee4;'><tr><td style='padding:15px'>Career Scripters<br>5-H, Johar Town, Lahore<br />careerscripters@gmail.com</td><td style='padding:15px'>"+
        this.bill_method.name+"&nbsp;&nbsp;" + this.bill_method.account_number +"</td><td style='padding:15px'>"+this.Date()+"</td></tr></tbody></table>  \
        <h2>Account Detail</h2><table border='1' style='width:100%;border-collapse:collapse'><thead style='background-color: #019267;color:white;'><tr><th style='padding:15px'>Name</th><th style='padding:15px'>Email</th><th style='padding:15px'>Phone No</th></tr></thead><tbody style='text-align:center;background-color: #cdeee4;'><tr><td style='padding:15px'>"+this.userInfo_form.value.name+"</td><td style='padding:15px'>"+this.userInfo_form.value.email+"</td><td style='padding:15px'>"+this.userInfo_form.value.phone_no+"</td></tr></tbody></table> \
        <div><h2>Order summary</h2></div><div><table border='1' style='width:100%;border-collapse:collapse'><thead style='background-color: #019267;color:white;'><tr><th style='padding:15px'> \
                Item Type</th><th style='padding:15px'>Item</th><th style='padding:15px'>Status</th><th style='padding:15px'>Price</th></tr></thead><tbody style='text-align:center;background-color: #cdeee4;'><tr><td style='padding:15px'>Package</td><td style='padding:15px'>"+
        this.package_name + "</td><td style='color:red;padding:15px'>Unpaid</td><td style='padding:15px'>RS." + this.pkg_price + "</td></tr>" +
        (this.listOfSelectedAddOns.length >= 1 ? this.getlistOfSelectedAddOns() : "")
        + "<tr><td colspan='3' style='padding:15px'><strong>5% GST Tax</strong></td><td style='padding:15px'>" +
        this.tax + "</td></tr><tr><td colspan='3' style='padding:15px'><strong>Total</strong></td><td style='padding:15px'><h4>RS." + this.caculateTotalPrice(this.total_price_without_tax, this.tax) +
        "</h4></td></tr></tbody></table></div></div></div>"
    }
    //verify email exist or not
    this.homeService.validateEmail(this.userInfo_form.value.email).subscribe((res) => {
      if (res) {
        this.display_loading = false;
        if (res.status == "valid") {
          this.emailexist = true;
          //to empty form values on submit
          this.userInfo_form.reset();
          this.homeService.sendMessage(data).subscribe((res) => {
            console.log();
            this.bsModalRef = this.modalService.show(OrderConfirmationComponent, { class: 'modal-dialog-centered',backdrop: 'static'});
            this.bsModalRef.content.closeBtnName = 'Close';
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