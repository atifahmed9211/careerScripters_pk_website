import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import{Router} from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {

  constructor(
    private router:Router,
    public bsModalRef: BsModalRef,
  ) { }

  ngOnInit(): void {
  }
  redirectToHomePage()
  {
    this.bsModalRef.hide()
    this.router.navigate(['./']);
  }
}
