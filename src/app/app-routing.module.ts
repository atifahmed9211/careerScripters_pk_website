import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { PolicyComponent } from './policy/policy.component';
import { SamplesComponent } from './samples/samples.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'about',
    component:AboutComponent
  },
  // {
  //   path:'samples',
  //   component:SamplesComponent
  // },
  {
    path:'terms-and-conditions',
    component:TermsComponent
  },
  {
    path:'privacy-policy',
    component:PolicyComponent
  },
  {
    path:'checkout/:id',
    component:CheckoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
