import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { TrainingGeneratorPageRoutingModule } from './session-generator-routing.module';

import { TrainingGeneratorPage } from './session-generator.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { DaypickerComponent } from '../daypicker/daypicker.component'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TrainingGeneratorPageRoutingModule
  ],
  declarations: [TrainingGeneratorPage, NavbarComponent, DaypickerComponent]
})
export class TrainingGeneratorPageModule {



}
