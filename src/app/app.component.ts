import {
  Component,
  HostListener,
  OnInit} from '@angular/core';
import { MusicService } from './the-city/services/music.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {

  constructor(private music: MusicService) {}
  isMobile = false;
  showSplash = false;

  ngOnInit(): void {

    this.checkDevice();
    const hasVisited = localStorage.getItem('hasVisited');
      if (!hasVisited) {
        this.showSplash = true;
        localStorage.setItem('hasVisited', 'true');

        setTimeout(() => {
          this.showSplash = false;
        }, 3000);
    }
  }
    @HostListener('window:resize')
  onResize() {
    this.checkDevice();
  }
private musicStarted = false;

@HostListener('window:click')
@HostListener('window:keydown')
startMusic() {

  if (!this.musicStarted) {

    this.music.play();
    this.musicStarted = true;

  }
}
  checkDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    this.isMobile =
      /android|iphone|ipad|ipod|mobile|tablet/i.test(userAgent)
      || window.innerWidth < 900;
  }

  title = 'BityTheCity';
}
