import { Component, HostListener, OnInit } from '@angular/core';

type Direction = 'up' | 'down' | 'left' | 'right';

interface DialoguePage {
  speaker: string;
  text: string;
  characterImage: string;
}

interface TriggerZone {
  x: number;
  y: number;
  width: number;
  height: number;

  title: string;

  conversation: DialoguePage[];
}

@Component({
  selector: 'app-servicescenter',
  templateUrl: './servicescenter.component.html',
  styleUrls: ['./servicescenter.component.scss']
})
export class ServicescenterComponent implements OnInit {
 dialogueTitle = 'ABOUT ME';
    showInteractButton = false;
    showDialogue = false;
    dialogueIndex = 0;

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
        x: 0,
        y: 0,
        width: 3000,
        height: 410
      },
      {
        x: 550,
        y: 400,
        width: 350,
        height: 100
      }


    ];

    triggerZones: TriggerZone[] = [


       {
          x: 450,
          y: 400,
          width: 500,
          height: 200,

          title: 'Services',

          conversation: [

            {
              speaker: 'Woman',
              text: 'Hello, how can I help you?',
              characterImage: 'assets/Library woman.png'
            },

            {
              speaker: 'Bayan',
              text: 'Oh, Hi, do you need a graphic designer?',
              characterImage: 'assets/bayan/down_idle.webp'
            },

            {
              speaker: 'Woman',
              text: 'Yes, sure! what can you do?',
              characterImage: 'assets/Library woman.png'
            },

            {
              speaker: 'Bayan',
              text: 'I can do a lot of things! I will tell you everything!',
              characterImage: 'assets/bayan/down_idle.webp'

            },

            {
              speaker: 'Bayan',
              text: `I can do:
        - Visual Identities
        - Profiles
        - All printed documents`,
              characterImage: 'assets/bayan/down_idle.webp'
            },

            {
              speaker: 'Bayan',
              text: `- Website and Apps
        - Animation
        - Editing and montage
        - Photo editing
        - Character Design`,
              characterImage: 'assets/bayan/down_idle.webp'
            },

            {
              speaker: 'Bayan',
              text: `- Typography Design
        - Social Media
        - Campaigns

        yeah.... I guess that's it.`,
              characterImage: 'assets/bayan/down_idle.webp'
            },

            {
              speaker: 'Woman',
              text: 'Impressive, can you leave your contact information in the contact center so we can reach you?',
              characterImage: 'assets/Library woman.png'
            },

            {
              speaker: 'Bayan',
              text: 'Suuuure!! thank you ma\'am.',
              characterImage: 'assets/bayan/down_idle.webp'
            }

          ]
        }
    ];

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

  activeTrigger: TriggerZone | null = null;


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

      if (!this.activeTrigger) return;

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

  }, 25);
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
