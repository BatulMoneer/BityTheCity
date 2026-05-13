import { BayanshouseComponent } from './bayanshouse/bayanshouse.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './city/city.component';
import { GameComponent } from './game/game.component';
import { ServicescenterComponent } from './servicescenter/servicescenter.component';
import { ProjectscenterComponent } from './projectscenter/projectscenter.component';
import { SnakegameComponent } from './snakegame/snakegame.component';
import { ContactcenterComponent } from './contactcenter/contactcenter.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: GameComponent
  },
  {
    path: 'bayanshouse',
    component: BayanshouseComponent
  },
  {
    path: 'servicescenter',
    component: ServicescenterComponent
  },
  {
    path: 'projectscenter',
    component: ProjectscenterComponent
  },
  {
    path: 'snakegame',
    component: SnakegameComponent
  },
  {
    path: 'contactcenter',
    component: ContactcenterComponent
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TheCityRoutingModule { }
