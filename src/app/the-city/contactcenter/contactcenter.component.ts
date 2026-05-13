import { Component, HostListener, OnInit } from '@angular/core';

type Direction = 'up' | 'down' | 'left' | 'right';

interface ConversationPage {
  speaker: string;
  text: string;
}

interface TriggerZone {
  x: number;
  y: number;
  width: number;
  height: number;

  title: string;

  conversation: ConversationPage[];
}

@Component({
  selector: 'app-contactcenter',
  templateUrl: './contactcenter.component.html',
  styleUrls: ['./contactcenter.component.scss']
})
export class ContactcenterComponent implements OnInit {

  showInteractButton = false;
  showDialogue = false;

  displayedText = '';
  isTyping = false;

  debug = true;

  playerX = 400;
  playerY = 500;

  speed = 5;

  keys: Record<string, boolean> = {};

  direction: Direction = 'down';

  frameIndex = 0;
  currentFrame = '';

  isMoving = false;

  dialogueIndex = 0;

  private lastFrameTime = 0;
  private frameDuration = 150;

  activeTrigger: TriggerZone | null = null;

  blockedAreas = [

    {
      x: 0,
      y: 0,
      width: 3000,
      height: 500
    },

    {
      x: 0,
      y: 500,
      width: 70,
      height: 100
    },
    {
      x: 1100,
      y: 500,
      width: 140,
      height: 100
    }

  ];

  triggerZones: TriggerZone[] = [

    {
      x: 500,
      y: 250,
      width: 400,
      height: 350,

      title: 'Contact Information',

      conversation: [

        {
          speaker: 'Bayan',

          text: `You can contact me on:

Email: Bayanmrkn2005@gmail.com

Instagram: Bayanmoneerm

TikTok: Notberrycool

LinkedIn: Bayanmrakkan

Phone Number: +966 57 300 7224`,

        }

      ]
    }

  ];

  frames: Record<Direction, string[]> = {
    down: [
      'assets/bayan/down_idle.webp',
      'assets/bayan/down_1.webp',
      'assets/bayan/down_2.webp'
    ],

    up: [
      'assets/bayan/up_idle.webp',
      'assets/bayan/up_1.webp',
      'assets/bayan/up_2.webp'
    ],

    left: [
      'assets/bayan/left_idle.webp',
      'assets/bayan/left_1.webp',
      'assets/bayan/left_2.webp'
    ],

    right: [
      'assets/bayan/right_idle.webp',
      'assets/bayan/right_1.webp',
      'assets/bayan/right_2.webp'
    ]
  };

  ngOnInit(): void {
    this.gameLoop(0);
  }

  gameLoop = (timestamp: number) => {

    this.updateMovement();
    this.updateAnimation(timestamp);

    requestAnimationFrame(this.gameLoop);
  };

  updateMovement() {

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

    const nextX = this.playerX + dx;
    const nextY = this.playerY + dy;

    if (!this.isColliding(nextX, this.playerY)) {
      this.playerX = nextX;
    }

    if (!this.isColliding(this.playerX, nextY)) {
      this.playerY = nextY;
    }

    this.playerX = Math.max(
      40,
      Math.min(window.innerWidth - 40, this.playerX)
    );

    this.playerY = Math.max(
      40,
      Math.min(window.innerHeight - 40, this.playerY)
    );

    this.checkTriggers();
  }

  checkTriggers() {

    this.showInteractButton = false;
    this.activeTrigger = null;

    for (const zone of this.triggerZones) {

      const inside = (

        this.playerX < zone.x + zone.width &&
        this.playerX + 40 > zone.x &&
        this.playerY < zone.y + zone.height &&
        this.playerY + 40 > zone.y

      );

      if (inside) {

        this.showInteractButton = true;
        this.activeTrigger = zone;

        break;
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

  updateAnimation(timestamp: number) {

    if (this.isMoving) {

      if (timestamp - this.lastFrameTime > this.frameDuration) {

        this.frameIndex = (this.frameIndex + 1) % 3;

        this.lastFrameTime = timestamp;
      }

    } else {

      this.frameIndex = 0;
    }

    this.currentFrame =
      this.frames[this.direction][this.frameIndex];
  }

  openDialogue() {

    if (!this.activeTrigger) return;

    this.showDialogue = true;

    this.dialogueIndex = 0;

    this.startTyping();
  }

  closeDialogue() {

    this.showDialogue = false;

    this.displayedText = '';
  }

  nextDialogue() {

    if (this.isTyping) return;

    const total =
      this.activeTrigger?.conversation.length || 0;

    if (this.dialogueIndex < total - 1) {

      this.dialogueIndex++;

      this.startTyping();

    } else {

      this.closeDialogue();
    }
  }

  startTyping() {

    this.displayedText = '';

    this.isTyping = true;

    const text =
      this.activeTrigger?.conversation[this.dialogueIndex]?.text || '';

    let index = 0;

    const interval = setInterval(() => {

      this.displayedText += text[index];

      index++;

      if (index >= text.length) {

        clearInterval(interval);

        this.isTyping = false;
      }

    }, 20);
  }

  @HostListener('window:keydown', ['$event'])
  keyDown(e: KeyboardEvent) {

    this.keys[e.key] = true;

    if (
      (e.key === 'e' || e.key === 'E') &&
      this.showInteractButton &&
      !this.showDialogue
    ) {

      this.openDialogue();
    }

    if (
      (e.key === 'e' || e.key === 'E') &&
      this.showDialogue &&
      !this.isTyping
    ) {

      this.nextDialogue();
    }

    if (e.key === 'Escape') {

      this.closeDialogue();
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyUp(e: KeyboardEvent) {

    this.keys[e.key] = false;
  }

  get currentConversation() {

    return this.activeTrigger?.conversation[this.dialogueIndex];
  }
}
