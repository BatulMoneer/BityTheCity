import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../services/music.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  musicOn = true;

  constructor(private musicService: MusicService) {}

  toggleMusic() {
    this.musicService.toggle();
    this.musicOn = this.musicService.playing;
  }

  ngOnInit(): void {
  }

}
