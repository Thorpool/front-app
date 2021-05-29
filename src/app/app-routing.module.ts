import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IsSignInGuard} from './guards/is-sign-in.guard';
import {CompanyListComponent} from './compenents/company-list/company-list.component';
import {CompanyComponent} from './compenents/company/company.component';


const routes: Routes = [
  {
    path : '',
    component : CompanyListComponent
  },
  {
    path : 'company/:id',
    component : CompanyComponent,
    canActivate: [
      IsSignInGuard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    IsSignInGuard
  ]
})
export class AppRoutingModule { }
