import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingGeneratorPage } from './session-generator.page';

const routes: Routes = [
  {
    path: '',
    component: TrainingGeneratorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingGeneratorPageRoutingModule { }
