import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private audio = new Audio();
  private isPlaying = true;

  constructor() {
    this.audio.src = 'assets/bgmusic.mp3';
    this.audio.loop = true;
    this.audio.volume = 0.5;
  }

  play() {
    this.audio.play();
    this.isPlaying = true;
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  get playing() {
    return this.isPlaying;
  }
}
