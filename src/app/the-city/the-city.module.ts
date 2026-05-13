import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TheCityRoutingModule } from './the-city-routing.module';
import { CityComponent } from './city/city.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { BayanComponent } from './bayan/bayan.component';
import { GameComponent } from './game/game.component';
import { BayanshouseComponent } from './bayanshouse/bayanshouse.component';
import { ProjectscenterComponent } from './projectscenter/projectscenter.component';
import { ServicescenterComponent } from './servicescenter/servicescenter.component';
import { ContactcenterComponent } from './contactcenter/contactcenter.component';
import { SnakegameComponent } from './snakegame/snakegame.component';


@NgModule({
  declarations: [
    CityComponent,
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    BayanComponent,
    GameComponent,
    BayanshouseComponent,
    ProjectscenterComponent,
    ServicescenterComponent,
    ContactcenterComponent,
    SnakegameComponent
  ],
  imports: [
    CommonModule,
    TheCityRoutingModule
  ]
})
export class TheCityModule { }
