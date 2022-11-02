import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'session-generator',
    loadChildren: () => import('./session-generator/session-generator.module').then(m => m.TrainingGeneratorPageModule)
  },
  {
    path: 'session',
    loadChildren: () => import('./session/session.module').then(m => m.SessionPageModule)
  },
  { path: 'account', loadChildren: accountModule },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
