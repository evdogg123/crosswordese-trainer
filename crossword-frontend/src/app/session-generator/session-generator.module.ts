import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { TrainingGeneratorPageRoutingModule } from './session-generator-routing.module';

import { TrainingGeneratorPage } from './session-generator.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TrainingGeneratorPageRoutingModule
  ],
  declarations: [TrainingGeneratorPage]
})
export class TrainingGeneratorPageModule {



}
