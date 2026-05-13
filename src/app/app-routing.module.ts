import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './the-city/layout/main-layout/main-layout.component';
import { SplashComponent } from './splash/splash.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    loadChildren: () => import('./the-city/the-city.module').then(m => m.TheCityModule)
  },
  { //must be at last, for an unexsisting page
    path: '**',
    redirectTo: '/auth/notFound' // or design a page for it 404
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
