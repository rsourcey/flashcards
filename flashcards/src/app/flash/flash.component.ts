import { IFlash } from './../flash.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.css']
})
export class FlashComponent implements OnInit {
  @Input() flash: IFlash = {
    id: 1,
    question: 'React to Angular',
    answer: 'No Reaction :)',
    show: false,
  };

  constructor() { }

  ngOnInit() {
  }

}
