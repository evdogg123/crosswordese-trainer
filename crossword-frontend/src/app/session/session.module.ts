import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SessionPageRoutingModule } from './session-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SessionPage } from './session.page';
import { NavbarComponent } from '../navbar/navbar.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SessionPageRoutingModule,
    HttpClientModule
  ],
  declarations: [SessionPage, NavbarComponent]
})
export class SessionPageModule { }
