import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bayan',
  templateUrl: './bayan.component.html',
  styleUrls: ['./bayan.component.scss']
})
export class BayanComponent implements OnInit {
 ngOnInit(): void {
 }
 @Input() frame = ''
}
