import { Component, HostListener, OnInit } from '@angular/core';

type Direction = 'up' | 'down' | 'left' | 'right';

interface TriggerZone {
  x: number;
  y: number;
  width: number;
  height: number;

  title: string;

  coverImage: string;

  pages: {
    text: string;
    leftImage?: string;
    rightImage?: string;
  }[];
}

@Component({
  selector: 'app-projectscenter',
  templateUrl: './projectscenter.component.html',
  styleUrls: ['./projectscenter.component.scss']
})
export class ProjectscenterComponent implements OnInit {

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
        height: 390
      },
      {
        x: 0,
        y: 600,
        width: 50,
        height: 330
      },
      {
        x: 50,
        y: 650,
        width: 100,
        height: 80
      },{
        x: 0,
        y: 400,
        width: 100,
        height: 60
      },{
        x: 50,
        y: 450,
        width: 100,
        height: 20
      },


    ];

    triggerZones: TriggerZone[] = [


        {
          x: 60,
          y: 250,
          width: 170,
          height: 230,

          title: 'Project One',

          coverImage: 'assets/projects/game-cover.webp',

          pages: [
            {
              text: 'This project is a packaging for bubble gum products, using my own character and pattern, one with Taif rose flavor, other with Jasmine rose flavor. '
            },

            {
              text: ' ',
              leftImage: 'assets/projects/pa/pa1.jpg',
              rightImage: 'assets/projects/pa/pa2.jpg'
            },

            {
              text: ' ',
              leftImage: 'assets/projects/pa/pa3.jpg',
              rightImage: 'assets/projects/pa/pa4.jpg'
            }
          ]
        },
        {
          x: 280,
          y: 250,
          width: 170,
          height: 230,

          title: 'Project Two',

          coverImage: 'assets/projects/game-cover.webp',

          pages: [
            {
              text: 'This project is a book talking about music and how I feel towards it, I used InDesign to make it, and I put all my emotions in it.'
            },

            {
              text: ' ',
              leftImage: 'assets/projects/pb/pb1.jpg',
              rightImage: 'assets/projects/pb/pb20.jpg'
            },
            {
              text: ' ',
              leftImage: 'assets/projects/pb/pb2.jpg',
              rightImage: 'assets/projects/pb/pb3.jpg'
            },
            {
              text: ' ',
              leftImage: 'assets/projects/pb/pb4.jpg',
              rightImage: 'assets/projects/pb/pb5.jpg'
            },
            {
              text: ' ',
              leftImage: 'assets/projects/pb/pb6.jpg',
              rightImage: 'assets/projects/pb/pb7.jpg'
            },
            {
              text: ' ',
              leftImage: 'assets/projects/pb/pb8.jpg',
              rightImage: 'assets/projects/pb/pb9.jpg'
            },
            {
              text: ' ',
              leftImage: 'assets/projects/pb/pb10.jpg',
              rightImage: 'assets/projects/pb/pb11.jpg'
            },
            {
              text: ' ',
              leftImage: 'assets/projects/pb/pb12.jpg',
              rightImage: 'assets/projects/pb/pb13.jpg'
            },
            {
              text: ' ',
              leftImage: 'assets/projects/pb/pb14.jpg',
              rightImage: 'assets/projects/pb/pb15.jpg'
            },
            {
              text: ' ',
              leftImage: 'assets/projects/pb/pb16.jpg',
              rightImage: 'assets/projects/pb/pb17.jpg'
            },
            {
              text: ' ',
              leftImage: 'assets/projects/pb/pb18.jpg',
              rightImage: 'assets/projects/pb/pb19.jpg'
            }
          ]
        },
        {
          x: 500,
          y: 250,
          width: 170,
          height: 230,

          title: 'Project Three',

          coverImage: 'assets/projects/game-cover.webp',

          pages: [
            {
              text: 'This project is a book talking about logical fallacies in Arabic since that there is no Arabic sources for this important topic.'
            },

            {
              text: ' ',
              leftImage: 'assets/projects/pc/pc1.jpg',
              rightImage: 'assets/projects/pc/pc20.jpg'
            },
            {
              text: ' ',
              leftImage: 'assets/projects/pc/pc2.jpg',
              rightImage: 'assets/projects/pc/pc3.jpg'
            },
            {
              text: ' ',
              leftImage: 'assets/projects/pc/pc4.jpg',
              rightImage: 'assets/projects/pc/pc5.jpg'
            },
            {
              text: ' ',
              leftImage: 'assets/projects/pc/pc6.jpg',
              rightImage: 'assets/projects/pc/pc7.jpg'
            },
            {
              text: ' ',
              leftImage: 'assets/projects/pc/pc8.jpg',
              rightImage: 'assets/projects/pc/pc9.jpg'
            },
            {
              text: ' ',
              leftImage: 'assets/projects/pc/pc10.jpg',
              rightImage: 'assets/projects/pc/pc11.jpg'
            },
            {
              text: ' ',
              leftImage: 'assets/projects/pc/pc12.jpg',
              rightImage: 'assets/projects/pc/pc13.jpg'
            },
            {
              text: ' ',
              leftImage: 'assets/projects/pc/pc14.jpg',
              rightImage: 'assets/projects/pc/pc15.jpg'
            },
            {
              text: ' ',
              leftImage: 'assets/projects/pc/pc16.jpg',
              rightImage: 'assets/projects/pc/pc17.jpg'
            },
            {
              text: ' ',
              leftImage: 'assets/projects/pc/pc18.jpg',
              rightImage: 'assets/projects/pc/pc19.jpg'
            }

          ]
        },
        {
          x: 720,
          y: 250,
          width: 170,
          height: 230,

          title: 'Project Four',

          coverImage: 'assets/projects/game-cover.webp',

          pages: [
            {
              text: 'This project is two posters for a redesign I did for Block Buster.'
            },

            {
              text: ' ',
              leftImage: 'assets/projects/pd/pd1.jpg',
              rightImage: 'assets/projects/pd/pd2.jpg'
            }
          ]
        },
        {
          x: 940,
          y: 250,
          width: 170,
          height: 230,

          title: 'Project Five',

          coverImage: 'assets/projects/game-cover.webp',

          pages: [
            {
              text: 'This project is a magazine talking about me in some aspects, I used InDesign to get this project done.'
            },

            {
              text: ' ',
              leftImage: 'assets/projects/pe/pe1.jpg',
              rightImage: 'assets/projects/pe/pe2.jpg'
            },
            {
              text: ' ',
              leftImage: 'assets/projects/pe/pe3.jpg',
              rightImage: 'assets/projects/pe/pe4.jpg'
            },
            {
              text: ' ',
              leftImage: 'assets/projects/pe/pe5.jpg',
              rightImage: 'assets/projects/pe/pe6.jpg'
            },
            {
              text: ' ',
              leftImage: 'assets/projects/pe/pe7.jpg',
              rightImage: 'assets/projects/pe/pe8.jpg'
            },
          ]
        },
        {
          x: 1160,
          y: 250,
          width: 170,
          height: 230,

          title: 'Project Six',

          coverImage: 'assets/projects/game-cover.webp',

          pages: [
            {
              text: 'This project is two posters for a campaign I did for a game called Knights of lights.'
            },

            {
              text: ' ',
              leftImage: 'assets/projects/pf/pf1.jpg',
              rightImage: 'assets/projects/pf/pf2.jpg'
            },

          ]
        },


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

      const pages = this.activeTrigger?.pages || [];

      if (this.dialogueIndex < pages.length - 1) {

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
      this.activeTrigger?.pages[this.dialogueIndex].text || '';

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
