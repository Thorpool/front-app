import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPopupComponent } from './compenents/login-popup/login-popup.component';
import {ReactiveFormsModule} from '@angular/forms';
import {
    MatButtonModule, MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule, MatSelectModule,
    MatTableModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import { CompanyListComponent } from './compenents/company-list/company-list.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { NavMenuComponent } from './compenents/nav-menu/nav-menu.component';
import {NavLogComponent} from './compenents/nav-log/nav-log.component';
import { CompanyComponent } from './compenents/company/company.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPopupComponent,
    CompanyListComponent,
    NavMenuComponent,
    NavLogComponent,
    CompanyComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatListModule,
        MatTableModule,
        NgxPaginationModule,
        MatDialogModule,
        MatSelectModule
    ],
  entryComponents: [
    LoginPopupComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
