import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }
  playerX = 1950;
  playerY = 470;

  movePlayer(x: number, y: number) {
    this.playerX = x;
    this.playerY = y;
  }
}
