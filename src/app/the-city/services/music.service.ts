import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  private audio = new Audio('assets/bgmusic.mp3');

  private isPlaying = false;

  constructor() {
    this.audio.loop = true;
    this.audio.volume = 0.5;
  }

  async play() {

    try {

      await this.audio.play();
      this.isPlaying = true;

    } catch (err) {

      console.log('Autoplay blocked');

    }
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
  }

  async toggle() {

    if (this.audio.paused) {

      await this.play();

    } else {

      this.pause();

    }
  }

  get playing() {
    return this.isPlaying;
  }
}
