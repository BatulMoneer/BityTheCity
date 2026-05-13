
import {Component,ElementRef,HostListener,OnInit,ViewChild} from '@angular/core';
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
interface SnakePart {
  x: number;
  y: number;
}
@Component({
  selector: 'app-snakegame',
  templateUrl: './snakegame.component.html',
  styleUrls: ['./snakegame.component.scss']
})
export class SnakegameComponent implements OnInit {

  @ViewChild('gameBoard') gameBoard!: ElementRef;

 tileSize = 40;
  boardWidth = 0;
  boardHeight = 0;
  snake: SnakePart[] = [];
  food = {
    x: 10,
    y: 10
  };
  direction: Direction = 'RIGHT';
  nextDirection: Direction = 'RIGHT';
  score = 0;
  gameStarted = false;
  gameOver = false;
  gameSpeed = 160;
  gameLoop: any;

  ngOnInit(): void {
      this.updateBoardSize();
      this.resetGame();
    }

    updateBoardSize() {
      this.boardWidth = Math.floor(window.innerWidth / this.tileSize);
      this.boardHeight = Math.floor(window.innerHeight / this.tileSize);
    }

  resetGame() {
    this.snake = [
      { x: 5, y: 10 },
      { x: 4, y: 10 },
      { x: 3, y: 10 }
    ];
    this.direction = 'RIGHT';
    this.nextDirection = 'RIGHT';
    this.score = 0;
    this.gameOver = false;
    this.spawnFood();
  }

  startGame() {
    this.resetGame();
    this.gameStarted = true;
    clearInterval(this.gameLoop);
    this.gameLoop = setInterval(() => {
      this.updateGame();
    }, this.gameSpeed);
  }

  updateGame() {
      this.direction = this.nextDirection;
      const head = { ...this.snake[0] };
      switch (this.direction) {
        case 'UP':
          head.y--;
          break;

        case 'DOWN':
          head.y++;
          break;

        case 'LEFT':
          head.x--;
          break;

        case 'RIGHT':
          head.x++;
          break;
      }


      if (head.x < 0) {
        head.x = this.boardWidth - 1;
      }
      if (head.x >= this.boardWidth) {
        head.x = 0;
      }
      if (head.y < 0) {
        head.y = this.boardHeight - 1;
      }
      if (head.y >= this.boardHeight) {
        head.y = 0;
      }
      if (this.checkSelfCollision(head)) {

        this.endGame();
        return;
      }
      this.snake.unshift(head);

      if (head.x === this.food.x && head.y === this.food.y) {
        this.score++;
        this.spawnFood();
      } else {
        this.snake.pop();
      }
    }
    checkSelfCollision(head: SnakePart): boolean {
      return this.snake.some((part, index) => {
        if (index === 0) return false;
        return (
          part.x === head.x &&
          part.y === head.y
        );
      });
    }

  spawnFood() {
    let validPosition = false;
    while (!validPosition) {
      const randomX = Math.floor(Math.random() * this.boardWidth);
      const randomY = Math.floor(Math.random() * this.boardHeight);
      const snakeOnTile = this.snake.some(part => {
        return (
          part.x === randomX &&
          part.y === randomY
        );
      });
      if (!snakeOnTile) {
        this.food.x = randomX;
        this.food.y = randomY;
        validPosition = true;
      }
    }
  }

  endGame() {
    clearInterval(this.gameLoop);
    this.gameOver = true;
  }

  getHeadRotation(): string {
    switch (this.direction) {
      case 'UP':
        return 'rotate(0deg)';
      case 'DOWN':
        return 'rotate(180deg)';
      case 'LEFT':
        return 'rotate(-90deg)';
      default:
        return 'rotate(90deg)';
    }
  }

 getTailRotation(index: number): string {
      const tail = this.snake[index];
      const beforeTail = this.snake[index - 1];
      const dx = tail.x - beforeTail.x;
      const dy = tail.y - beforeTail.y;
      if (dx === 1 || dx < -1) {
        return 'rotate(-90deg)';
      }

      if (dx === -1 || dx > 1) {
        return 'rotate(90deg)';
      }

      if (dy === 1 || dy < -1) {
        return 'rotate(0deg)';
      }

      return 'rotate(180deg)';
    }
  @HostListener('window:resize')
    onResize() {
      this.updateBoardSize();
    }

  @HostListener('window:keydown', ['$event'])
  keyDown(event: KeyboardEvent) {
    if (!this.gameStarted) return;
    switch (event.key) {
      case 'ArrowUp':
        if (this.direction !== 'DOWN') {
          this.nextDirection = 'UP';
        }
        break;
      case 'ArrowDown':
        if (this.direction !== 'UP') {
          this.nextDirection = 'DOWN';
        }
        break;
      case 'ArrowLeft':
        if (this.direction !== 'RIGHT') {
          this.nextDirection = 'LEFT';
        }
        break;
      case 'ArrowRight':
        if (this.direction !== 'LEFT') {
          this.nextDirection = 'RIGHT';
        }
        break;
    }
  }
}

