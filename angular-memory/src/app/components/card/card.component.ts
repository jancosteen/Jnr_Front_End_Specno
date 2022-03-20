import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardData } from 'src/app/interfaces/cardData.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('cardFlip', [
      state('default', style({
        transform: 'none'
      })),
      state('flipped', style({
        transform: 'rotateY(180deg)'
      })),
      transition('default => flipped', [
        animate('400ms')
      ]),
      transition('flipped => default', [
        animate('200ms')
      ])
    ])
  ]
})
export class CardComponent implements OnInit {

  data: CardData = {
    imageId: "red_joker",
    state: "default"
  };

  //@Output() cardClicked = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  cardClicked() {
    if (this.data.state === "default") {
      this.data.state = "flipped";
    } else {
      this.data.state = "default";
    }
  }

}
