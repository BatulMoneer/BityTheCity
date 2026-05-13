import { Component, HostListener, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';

type Direction = 'up' | 'down' | 'left' | 'right';

type TriggerType = 'bubble' | 'button';

interface TriggerZone {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'bubble' | 'button';
  text?: string;
  title?: string;
  buttonText?: string;
  uiOffsetX?: number;
  uiOffsetY?: number;
  route?: string;
}
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {


   SCALE = 0.5;

   constructor(
  private gameService: GameService,
  private router: Router
) {}

   debugZones = true;

  triggerZones: TriggerZone[] = [


  {
  x: 4293 * this.SCALE,
  y: 761 * this.SCALE,
  width: 925 * this.SCALE,
  height: 397 * this.SCALE,
  type: 'button',
  title: 'Bayan\'s House',
  buttonText: 'E',
  route: '/bayanshouse',
  uiOffsetX: 200,
  uiOffsetY: -100
},
{
  x: 2524 * this.SCALE,
  y: 761 * this.SCALE,
  width: 925 * this.SCALE,
  height: 397 * this.SCALE,
  type: 'button',
  title: 'Projects Center',
  buttonText: 'E',
  route: '/projectscenter',
  uiOffsetX: 200,
  uiOffsetY: -100
},
{
  x: 1737 * this.SCALE,
  y: 3112 * this.SCALE,
  width: 1049 * this.SCALE,
  height: 363 * this.SCALE,
  type: 'button',
  title: 'Services Center',
  buttonText: 'E',
  route: '/servicescenter',
  uiOffsetX: 200,
  uiOffsetY: -100
},
{
  x: 2927 * this.SCALE,
  y: 3101 * this.SCALE,
  width: 754 * this.SCALE,
  height: 363 * this.SCALE,
  type: 'button',
  title: 'Contact Center',
  buttonText: 'E',
  route: '/contactcenter',
  uiOffsetX: 100,
  uiOffsetY: -100
},
{
  x: 3863 * this.SCALE,
  y: 3103 * this.SCALE,
  width: 2135 * this.SCALE,
  height: 363 * this.SCALE,
  type: 'button',
  title: 'Game',
  buttonText: 'E',
  route: '/snakegame',
  uiOffsetX: 500,
  uiOffsetY: -100
},
{
    x: 4151 * this.SCALE,
    y: 1880 * this.SCALE,
    width: 274 * this.SCALE,
    height: 274 * this.SCALE,
    type: 'bubble',
    title: 'Girl',
    text: 'Who Broke this swing?',
    uiOffsetX: -60,
    uiOffsetY: -140
  },
  {
    x: 2083 * this.SCALE,
    y: 1782 * this.SCALE,
    width: 274 * this.SCALE,
    height: 274 * this.SCALE,
    type: 'bubble',
    title: 'Boy',
    text: 'My cat was just here, she always run away',
    uiOffsetX: -20,
    uiOffsetY: -140
  },
  {
    x: 974 * this.SCALE,
    y: 1874 * this.SCALE,
    width: 274 * this.SCALE,
    height: 374 * this.SCALE,
    type: 'bubble',
    title: 'Chef',
    text: 'I have new pasta dishes that you should not miss.',
    uiOffsetX: -20,
    uiOffsetY: -140
  },
   {
    x: 953 * this.SCALE,
    y: 2681 * this.SCALE,
    width: 274 * this.SCALE,
    height: 374 * this.SCALE,
    type: 'bubble',
    title: 'Barber',
    text: 'I think you need a haircut miss!',
    uiOffsetX: -20,
    uiOffsetY: -140
  },
   {
    x: 5802 * this.SCALE,
    y: 3403 * this.SCALE,
    width: 274 * this.SCALE,
    height: 561 * this.SCALE,
    type: 'bubble',
    title: 'Officer',
    text: 'I\'m sorry you can\'t cross this road',
    uiOffsetX: -220,
    uiOffsetY: -40
  }

];

  activeZone: TriggerZone | null = null;

  activeBubble: string | null = null;
  activeButton: string | null = null;

    objects = [

    {x: 65 * this.SCALE, y: 2780 * this.SCALE, width: 960 * this.SCALE, height: 954 * this.SCALE,
      image: 'assets/city/down left house.webp'},
    {x: 952 * this.SCALE, y: 2695 * this.SCALE, width: 240 * this.SCALE, height: 240 * this.SCALE,
      image: 'assets/city/barber.webp'},
      {x: 3554 * this.SCALE, y: 1737 * this.SCALE, width: 536 * this.SCALE, height: 195 * this.SCALE,
      image: 'assets/city/swing.webp'},
    {x: 2063 * this.SCALE, y: 1786 * this.SCALE, width: 240 * this.SCALE, height: 240 * this.SCALE,
      image: 'assets/city/boy.webp'},
      {x: 4097 * this.SCALE, y: 1806 * this.SCALE, width: 240 * this.SCALE, height: 240 * this.SCALE,
      image: 'assets/city/girl.webp'},
    {x: 1919 * this.SCALE, y: 1093 * this.SCALE, width: 330 * this.SCALE, height: 189 * this.SCALE,
      image: 'assets/city/car.webp'},
    {x: 5066 * this.SCALE, y: 1955 * this.SCALE, width: 180 * this.SCALE, height: 180 * this.SCALE,
      image: 'assets/city/cat 1.webp'},
    {x: 3439 * this.SCALE, y: 917 * this.SCALE, width: 180 * this.SCALE, height: 180 * this.SCALE,
      image: 'assets/city/cat 2.webp'},
    {x: 969 * this.SCALE, y: 1886 * this.SCALE, width: 240 * this.SCALE, height: 240 * this.SCALE,
      image: 'assets/city/chef.webp'},
    {x: 5900 * this.SCALE, y: 3456 * this.SCALE, width: 240 * this.SCALE, height: 240 * this.SCALE,
      image: 'assets/city/f officer.webp'},
    {x: 1694 * this.SCALE, y: 2055 * this.SCALE, width: 1126 * this.SCALE, height: 1072 * this.SCALE,
      image: 'assets/city/left down house.webp'},
    {x: 5914 * this.SCALE, y: 3656 * this.SCALE, width: 240 * this.SCALE, height: 240 * this.SCALE,
      image: 'assets/city/m officer.webp'},
    {x: 2916 * this.SCALE, y: 1848 * this.SCALE, width: 776 * this.SCALE, height: 1288 * this.SCALE,
      image: 'assets/city/middle down house.webp'},
    {x: 2722 * this.SCALE, y: 3203 * this.SCALE, width: 240 * this.SCALE, height: 240 * this.SCALE,
      image: 'assets/city/old man.webp'},
    {x: 3862 * this.SCALE, y: 2022 * this.SCALE, width: 2135 * this.SCALE, height: 1271 * this.SCALE,
      image: 'assets/city/right down house.webp'},
    {x: 2266 * this.SCALE, y: 1767 * this.SCALE, width: 496 * this.SCALE, height: 252 * this.SCALE,
      image: 'assets/city/sllide.webp'},
    {x: 3887 * this.SCALE, y: 3427 * this.SCALE, width: 269 * this.SCALE, height: 190 * this.SCALE,
      image: 'assets/city/taxi.webp'},
    {x: 0 * this.SCALE, y: 1018 * this.SCALE, width: 1089 * this.SCALE, height: 866 * this.SCALE,
      image: 'assets/city/top left house.webp'},
    {x: 79 * this.SCALE, y: 1739 * this.SCALE, width: 958 * this.SCALE, height: 1049 * this.SCALE,
      image: 'assets/city/middle left house.webp'},
    {x: 129 * this.SCALE, y: 1841 * this.SCALE, width: 240 * this.SCALE, height: 240 * this.SCALE,
      image: 'assets/city/guy.webp'},
    {x: 4066 * this.SCALE, y: 794 * this.SCALE, width: 59 * this.SCALE, height: 287 * this.SCALE,
      image: 'assets/city/light.webp'},
  {x: 3643 * this.SCALE, y: 794 * this.SCALE, width: 59 * this.SCALE, height: 287 * this.SCALE,
      image: 'assets/city/light.webp'},
  {x: 2380 * this.SCALE, y: 794 * this.SCALE, width: 59 * this.SCALE, height: 287 * this.SCALE,
      image: 'assets/city/light.webp'},
  {x: 1263 * this.SCALE, y: 794 * this.SCALE, width: 59 * this.SCALE, height: 287 * this.SCALE,
      image: 'assets/city/light.webp'},
  {x: 1135 * this.SCALE, y: 1150 * this.SCALE, width: 59 * this.SCALE, height: 287 * this.SCALE,
      image: 'assets/city/light.webp'},
  {x: 1135 * this.SCALE, y: 1907 * this.SCALE, width: 59 * this.SCALE, height: 287 * this.SCALE,
      image: 'assets/city/light.webp'},
  {x: 1135 * this.SCALE, y: 2663 * this.SCALE, width: 59 * this.SCALE, height: 287 * this.SCALE,
      image: 'assets/city/light.webp'},
  {x: 1135 * this.SCALE, y: 3420 * this.SCALE, width: 59 * this.SCALE, height: 287 * this.SCALE,
      image: 'assets/city/light.webp'},
  {x: 1542 * this.SCALE, y: 1694 * this.SCALE, width: 59 * this.SCALE, height: 287 * this.SCALE,
      image: 'assets/city/light.webp'},
  {x: 1542 * this.SCALE, y: 2254 * this.SCALE, width: 59 * this.SCALE, height: 287 * this.SCALE,
      image: 'assets/city/light.webp'},
      {x: 1542 * this.SCALE, y: 2820 * this.SCALE, width: 59 * this.SCALE, height: 287 * this.SCALE,
      image: 'assets/city/light.webp'},
      {x: 3735 * this.SCALE, y: 3135 * this.SCALE, width: 59 * this.SCALE, height: 287 * this.SCALE,
      image: 'assets/city/light.webp'},
      {x: 1030 * this.SCALE, y: 3624 * this.SCALE, width: 59 * this.SCALE, height: 287 * this.SCALE,
      image: 'assets/city/light.webp'},
      {x: 1840 * this.SCALE, y: 1300 * this.SCALE, width: 59 * this.SCALE, height: 287 * this.SCALE,
      image: 'assets/city/light.webp'},
      {x: 2397 * this.SCALE, y: 1300 * this.SCALE, width: 59 * this.SCALE, height: 287 * this.SCALE,
      image: 'assets/city/light.webp'},
      {x: 3153 * this.SCALE, y: 1300 * this.SCALE, width: 59 * this.SCALE, height: 287 * this.SCALE,
      image: 'assets/city/light.webp'},
      {x: 3911 * this.SCALE, y: 1300 * this.SCALE, width: 59 * this.SCALE, height: 287 * this.SCALE,
      image: 'assets/city/light.webp'},
      {x: 4797 * this.SCALE, y: 1300 * this.SCALE, width: 59 * this.SCALE, height: 287 * this.SCALE,
      image: 'assets/city/light.webp'},
      {x: 5489 * this.SCALE, y: 1300 * this.SCALE, width: 59 * this.SCALE, height: 287 * this.SCALE,
      image: 'assets/city/light.webp'},


  ];

    blockedAreas = [
    // up
    { x: 5450 * this.SCALE, y: 627 * this.SCALE, width: 580 * this.SCALE, height: 400 * this.SCALE },
    { x: 4340 * this.SCALE, y: 627 * this.SCALE, width: 900 * this.SCALE, height: 404 * this.SCALE },
    { x: 2580 * this.SCALE, y: 627 * this.SCALE, width: 880 * this.SCALE, height: 400 * this.SCALE },
    { x: 1610 * this.SCALE, y: 627 * this.SCALE, width: 580 * this.SCALE, height: 400 * this.SCALE },
    // left
    { x: 150 * this.SCALE, y: 1454 * this.SCALE, width: 900 * this.SCALE, height: 570 * this.SCALE },
    { x: 150 * this.SCALE, y: 2454 * this.SCALE, width: 900 * this.SCALE, height: 451 * this.SCALE },
    { x: 150 * this.SCALE, y: 3350 * this.SCALE, width: 850 * this.SCALE, height: 451 * this.SCALE },
    //down
    { x: 1750 * this.SCALE, y: 2929 * this.SCALE, width: 1050 * this.SCALE, height: 392 * this.SCALE },
    { x: 2973 * this.SCALE, y: 2929 * this.SCALE, width: 700 * this.SCALE, height: 392 * this.SCALE },
    { x: 3900 * this.SCALE, y: 2929 * this.SCALE, width: 2131 * this.SCALE, height: 392 * this.SCALE },
    { x: 4646 * this.SCALE, y: 3250 * this.SCALE, width: 45.4 * this.SCALE, height: 241 * this.SCALE },
    { x: 5210 * this.SCALE, y: 3250 * this.SCALE, width: 45.4 * this.SCALE, height: 241 * this.SCALE },
    // lights
    { x: 5438 * this.SCALE, y: 3338 * this.SCALE, width: 20 * this.SCALE, height: 175 * this.SCALE },
    { x: 6004 * this.SCALE, y: 3338 * this.SCALE, width: 20 * this.SCALE, height: 175 * this.SCALE },
    { x: 4402 * this.SCALE, y: 3338 * this.SCALE, width: 20 * this.SCALE, height: 175 * this.SCALE },
    { x: 3797 * this.SCALE, y: 3338 * this.SCALE, width: 20 * this.SCALE, height: 175 * this.SCALE },
    { x: 3050 * this.SCALE, y: 3338 * this.SCALE, width: 20 * this.SCALE, height: 175 * this.SCALE },
    { x: 2450 * this.SCALE, y: 3338 * this.SCALE, width: 20 * this.SCALE, height: 175 * this.SCALE },
    { x: 1857 * this.SCALE, y: 3338 * this.SCALE, width: 20 * this.SCALE, height: 175 * this.SCALE },
    { x: 1590 * this.SCALE, y: 3033 * this.SCALE, width: 20 * this.SCALE, height: 175 * this.SCALE },
    { x: 1590 * this.SCALE, y: 2470 * this.SCALE, width: 20 * this.SCALE, height: 175 * this.SCALE },
    { x: 1590 * this.SCALE, y: 1906 * this.SCALE, width: 20 * this.SCALE, height: 175 * this.SCALE },
    { x: 1184 * this.SCALE, y: 3632 * this.SCALE, width: 20 * this.SCALE, height: 175 * this.SCALE },
    { x: 1184 * this.SCALE, y: 2875 * this.SCALE, width: 20 * this.SCALE, height: 175 * this.SCALE },
    { x: 1184 * this.SCALE, y: 2119 * this.SCALE, width: 20 * this.SCALE, height: 175 * this.SCALE },
    { x: 1184 * this.SCALE, y: 1363 * this.SCALE, width: 20 * this.SCALE, height: 175 * this.SCALE },
    { x: 1315 * this.SCALE, y: 1006 * this.SCALE, width: 20 * this.SCALE, height: 175 * this.SCALE },
    { x: 2426 * this.SCALE, y: 1006 * this.SCALE, width: 20 * this.SCALE, height: 175 * this.SCALE },
    { x: 3692 * this.SCALE, y: 1006 * this.SCALE, width: 20 * this.SCALE, height: 175 * this.SCALE },
    { x: 4117 * this.SCALE, y: 1006 * this.SCALE, width: 20 * this.SCALE, height: 175 * this.SCALE },
    { x: 4609 * this.SCALE, y: 1006 * this.SCALE, width: 20 * this.SCALE, height: 175 * this.SCALE },
    { x: 5220 * this.SCALE, y: 1006 * this.SCALE, width: 20 * this.SCALE, height: 175 * this.SCALE },
    { x: 5820 * this.SCALE, y: 1006 * this.SCALE, width: 20 * this.SCALE, height: 175 * this.SCALE },
    { x: 2495 * this.SCALE, y: 857 * this.SCALE, width: 20 * this.SCALE, height: 175 * this.SCALE },
    { x: 3541 * this.SCALE, y: 857 * this.SCALE, width: 20 * this.SCALE, height: 175 * this.SCALE },
    { x: 1067 * this.SCALE, y: 3806 * this.SCALE, width: 20 * this.SCALE, height: 175 * this.SCALE },
    { x: 0 * this.SCALE, y: 3613 * this.SCALE, width: 53 * this.SCALE, height: 367 * this.SCALE },
    { x: 5543 * this.SCALE, y: 1563 * this.SCALE, width: 20 * this.SCALE, height: 120 * this.SCALE },
    { x: 4850 * this.SCALE, y: 1563 * this.SCALE, width: 20 * this.SCALE, height: 120 * this.SCALE },
    { x: 3968 * this.SCALE, y: 1563 * this.SCALE, width: 20 * this.SCALE, height: 120 * this.SCALE },
    { x: 3213 * this.SCALE, y: 1563 * this.SCALE, width: 20 * this.SCALE, height: 120 * this.SCALE },
    { x: 2449 * this.SCALE, y: 1563 * this.SCALE, width: 20 * this.SCALE, height: 120 * this.SCALE },
    { x: 1860 * this.SCALE, y: 1563 * this.SCALE, width: 20 * this.SCALE, height: 120 * this.SCALE },
    // other
    { x: 0 * this.SCALE, y: 3910 * this.SCALE, width: 6690 * this.SCALE, height: 1062 * this.SCALE },
    { x: 0 * this.SCALE, y: 0 * this.SCALE, width: 3668 * this.SCALE, height: 618 * this.SCALE },
    { x: 4200 * this.SCALE, y: 0 * this.SCALE, width: 1954 * this.SCALE, height: 618 * this.SCALE },
    { x: 0 * this.SCALE, y: 0 * this.SCALE, width: 1125 * this.SCALE, height: 1161 * this.SCALE },
    { x: 6019 * this.SCALE, y: 1224 * this.SCALE, width: 64 * this.SCALE, height: 335 * this.SCALE },
    { x: 4244 * this.SCALE, y: 981 * this.SCALE, width: 40 * this.SCALE, height: 130 * this.SCALE },
    { x: 2261 * this.SCALE, y: 1002 * this.SCALE, width: 40 * this.SCALE, height: 130 * this.SCALE },
    { x: 1660 * this.SCALE, y: 1625 * this.SCALE, width: 97 * this.SCALE, height: 590 * this.SCALE },
    { x: 0 * this.SCALE, y: 1405 * this.SCALE, width: 97 * this.SCALE, height: 329 * this.SCALE },
    { x: 2293 * this.SCALE, y: 2018 * this.SCALE, width: 475 * this.SCALE, height: 123 * this.SCALE },
    { x: 3603 * this.SCALE, y: 1918 * this.SCALE, width: 475 * this.SCALE, height: 123 * this.SCALE },
    { x: 4797 * this.SCALE, y: 2065 * this.SCALE, width: 287 * this.SCALE, height: 107 * this.SCALE },
    { x: 4761 * this.SCALE, y: 1800 * this.SCALE, width: 287 * this.SCALE, height: 127 * this.SCALE },
    { x: 0 * this.SCALE, y: 1820 * this.SCALE, width: 74 * this.SCALE, height: 183 * this.SCALE },
    { x: 1062 * this.SCALE, y: 645 * this.SCALE, width: 122 * this.SCALE, height: 448 * this.SCALE },
    //objects
    {x: 1052 * this.SCALE, y: 2780 * this.SCALE, width: 70 * this.SCALE, height: 240 * this.SCALE},
    {x: 2163 * this.SCALE, y: 1880 * this.SCALE, width: 70 * this.SCALE, height: 240 * this.SCALE},
    {x: 4213 * this.SCALE, y: 1936 * this.SCALE, width: 70 * this.SCALE, height: 150 * this.SCALE},
    {x: 1919 * this.SCALE, y: 1180 * this.SCALE, width: 330 * this.SCALE, height: 189 * this.SCALE},
    {x: 5066 * this.SCALE, y: 2020 * this.SCALE, width: 180 * this.SCALE, height: 180 * this.SCALE},
    {x: 3439 * this.SCALE, y: 1000 * this.SCALE, width: 180 * this.SCALE, height: 180 * this.SCALE},
    {x: 1069 * this.SCALE, y: 1980 * this.SCALE, width: 70 * this.SCALE, height: 240 * this.SCALE},
    {x: 6000 * this.SCALE, y: 3530 * this.SCALE, width: 70 * this.SCALE, height: 240 * this.SCALE},
    {x: 6014 * this.SCALE, y: 3700 * this.SCALE, width: 120 * this.SCALE, height: 240 * this.SCALE},
    {x: 2822 * this.SCALE, y: 3280 * this.SCALE, width: 70 * this.SCALE, height: 240 * this.SCALE},
    {x: 3887 * this.SCALE, y: 3530 * this.SCALE, width: 269 * this.SCALE, height: 190 * this.SCALE},
    {x: 229 * this.SCALE, y: 1950 * this.SCALE, width: 70 * this.SCALE, height: 240 * this.SCALE},
  ];

  // world's cam
  worldX = 0;
  worldY = 0;

  worldWidth = 6079* 0.5;
  worldHeight = 5015* 0.5;

  viewportWidth = window.innerWidth;
  viewportHeight = window.innerHeight;

  // bayan pos
  playerWorldX = 1950;
  playerWorldY = 470;

  centerX = this.viewportWidth / 2;
  centerY = this.viewportHeight / 2;

  playerScreenX = this.centerX;
  playerScreenY = this.centerY;



  // arrows input
  keys: Record<string, boolean> = {};

  speed = 5;

  // animation
  direction: Direction = 'down';
  frameIndex = 0;
  currentFrame = '';
  isMoving = false;

  frames: Record<Direction, string[]> = {
    down: ['assets/bayan/down_idle.webp','assets/bayan/down_1.webp','assets/bayan/down_2.webp'],
    up:   ['assets/bayan/up_idle.webp','assets/bayan/up_1.webp','assets/bayan/up_2.webp'],
    left: ['assets/bayan/left_idle.webp','assets/bayan/left_1.webp','assets/bayan/left_2.webp'],
    right:['assets/bayan/right_idle.webp','assets/bayan/right_1.webp','assets/bayan/right_2.webp']
  };

  private lastFrameTime = 0;
  private frameDuration = 150;

  ngOnInit() {
    this.gameLoop(0);
  }

  gameLoop = (timestamp: number) => {
    this.updateMovement();
    this.updateAnimation(timestamp);
    requestAnimationFrame(this.gameLoop);
  };

  // moving
updateMovement() {
this.playerWorldX = this.gameService.playerX;
this.playerWorldY = this.gameService.playerY;
  let dx = 0;
  let dy = 0;

  if (this.keys['ArrowUp']) {
    dy -= this.speed;
    this.direction = 'up';
  }

  if (this.keys['ArrowDown']) {
    dy += this.speed;
    this.direction = 'down';
  }

  if (this.keys['ArrowLeft']) {
    dx -= this.speed;
    this.direction = 'left';
  }

  if (this.keys['ArrowRight']) {
    dx += this.speed;
    this.direction = 'right';
  }

  this.isMoving = dx !== 0 || dy !== 0;

  const nextX = this.playerWorldX + dx;
  const nextY = this.playerWorldY + dy;

  if (!this.isColliding(nextX, this.playerWorldY)) {
    this.playerWorldX = nextX;
  }

  if (!this.isColliding(this.playerWorldX, nextY)) {
    this.playerWorldY = nextY;
  }


  this.playerWorldX = Math.max(
    0,
    Math.min(this.worldWidth, this.playerWorldX)
  );

  this.playerWorldY = Math.max(
    0,
    Math.min(this.worldHeight, this.playerWorldY)
  );

  this.worldX = -(this.playerWorldX - this.centerX);
  this.worldY = -(this.playerWorldY - this.centerY);


  const minX = -(this.worldWidth - this.viewportWidth);
  const maxX = 0;

  const minY = -(this.worldHeight - this.viewportHeight);
  const maxY = 0;

  this.worldX = Math.max(minX, Math.min(maxX, this.worldX));
  this.worldY = Math.max(minY, Math.min(maxY, this.worldY));

  this.playerScreenX = this.playerWorldX + this.worldX;
  this.playerScreenY = this.playerWorldY + this.worldY;

  this.checkTriggerZones();

  this.gameService.playerX = this.playerWorldX;
this.gameService.playerY = this.playerWorldY;
}

  checkTriggerZones() {

    this.activeBubble = null;
    this.activeButton = null;
    this.activeZone = null;

    const playerSize = 40;

    for (const zone of this.triggerZones) {

      const colliding = (
        this.playerWorldX < zone.x + zone.width &&
        this.playerWorldX + playerSize > zone.x &&
        this.playerWorldY < zone.y + zone.height &&
        this.playerWorldY + playerSize > zone.y
      );

      if (colliding) {

        this.activeZone = zone;

        if (zone.type === 'bubble') {
          this.activeBubble = zone.text || '';
        }

        if (zone.type === 'button') {
          this.activeButton = zone.buttonText || '';
        }
      }
    }
  }


  isColliding(x: number, y: number): boolean {

    const playerSize = 40;

    return this.blockedAreas.some(area => {

      return (
        x < area.x + area.width &&
        x + playerSize > area.x &&
        y < area.y + area.height &&
        y + playerSize > area.y
      );

    });
  }

  //  animation
  updateAnimation(timestamp: number) {

    if (this.isMoving) {
      if (timestamp - this.lastFrameTime > this.frameDuration) {
        this.frameIndex = (this.frameIndex + 1) % 3;
        this.lastFrameTime = timestamp;
      }
    } else {
      this.frameIndex = 0;
    }

    this.currentFrame = this.frames[this.direction][this.frameIndex];
  }

  //  input
  @HostListener('window:keydown', ['$event'])
  keyDown(e: KeyboardEvent) {

  this.keys[e.key] = true;

  if (
    (e.key === 'e' || e.key === 'E') &&
    this.activeZone?.type === 'button' &&
    this.activeZone.route
  ) {

    this.router.navigate([this.activeZone.route]);

  }
  }

  @HostListener('window:keyup', ['$event'])
  keyUp(e: KeyboardEvent) {
    this.keys[e.key] = false;
  }
}
