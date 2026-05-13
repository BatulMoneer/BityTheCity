import { Component, HostListener, OnInit } from '@angular/core';

type Direction = 'up' | 'down' | 'left' | 'right';

@Component({
  selector: 'app-bayanshouse',
  templateUrl: './bayanshouse.component.html',
  styleUrls: ['./bayanshouse.component.scss']
})
export class BayanshouseComponent implements OnInit {

  dialogueTitle = 'ABOUT ME';
  showInteractButton = false;
  showDialogue = false;
  dialogueIndex = 0;
  dialoguePages = [
    'HI, I am Bayan, a passionate graphic designer currently studying at Umm Al Qura University. I find inspiration in every form of art, whether it’s design, music. ',
    'My journey is fueled by curiosity and the desire to learn new things.',
    'I enjoy blending creativity with functionality, turning ideas into meaningful visuals that connect with people.',
    'Beyond design, I have a deep appreciation for music, storytelling, and everything that sparks with originality.'
  ];

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

  private lastFrameTime = 0;
  private frameDuration = 150;

  showBubble = false;

  blockedAreas = [

  {
    x: 300,
    y: 0,
    width: 3000,
    height: 220
  },

  {
    x: 550,
    y: 0,
    width: 330,
    height: 280
  },

  {
    x: 950,
    y: 0,
    width: 380,
    height: 280
  },

  {
    x: 1300,
    y: 320,
    width: 200,
    height: 320
  },

  {
    x: 290,
    y: 0,
    width: 10,
    height: 350
  },

  {
    x: 600,
    y: 350,
    width: 280,
    height: 200
  },
  {
    x: 500,
    y: 370,
    width: 440,
    height: 150
  },
  {
    x: 650,
    y: 500,
    width: 150,
    height: 150
  }

];

  triggerZone = {
    x: 500,
    y: 300,
    width: 450,
    height: 370
  };

  frames: Record<Direction, string[]> = {
    down: ['assets/bayan/down_idle.webp','assets/bayan/down_1.webp','assets/bayan/down_2.webp'],
    up:   ['assets/bayan/up_idle.webp','assets/bayan/up_1.webp','assets/bayan/up_2.webp'],
    left: ['assets/bayan/left_idle.webp','assets/bayan/left_1.webp','assets/bayan/left_2.webp'],
    right:['assets/bayan/right_idle.webp','assets/bayan/right_1.webp','assets/bayan/right_2.webp']
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


    this.playerX = Math.max(40, Math.min(window.innerWidth - 40, this.playerX));

    this.playerY = Math.max(40, Math.min(window.innerHeight - 40, this.playerY));


    this.showInteractButton = this.isInsideTrigger();

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

  isInsideTrigger(): boolean {

    const t = this.triggerZone;

    return (
      this.playerX < t.x + t.width &&
      this.playerX + 40 > t.x &&
      this.playerY < t.y + t.height &&
      this.playerY + 40 > t.y
    );
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

    this.currentFrame = this.frames[this.direction][this.frameIndex];
  }

    openDialogue() {

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

    if (this.dialogueIndex < this.dialoguePages.length - 1) {

      this.dialogueIndex++;

      this.startTyping();

    } else {

      this.closeDialogue();
    }
  }

  startTyping() {

    this.displayedText = '';

    this.isTyping = true;

    const text = this.dialoguePages[this.dialogueIndex];

    let index = 0;

    const interval = setInterval(() => {

      this.displayedText += text[index];

      index++;

      if (index >= text.length) {

        clearInterval(interval);

        this.isTyping = false;
      }

    }, 30);
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
}
