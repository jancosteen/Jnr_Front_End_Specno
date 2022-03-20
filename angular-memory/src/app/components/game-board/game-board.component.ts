
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardData } from './../../interfaces/cardData.interface';
//import { RestartDialogComponent } from './restart-dialog/restart-dialog.component';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  cards: CardData[] = [];
  cardColor: string;

  cardImages = [
    '2_of_clubs',
    '2_of_diamonds',
    '2_of_hearts',
    '2_of_spades',
    '3_of_clubs',
    '3_of_diamonds',
    '3_of_hearts',
    '3_of_spades',
    '4_of_clubs',
    '4_of_diamonds',
    '4_of_hearts',
    '4_of_spades',
    '5_of_clubs',
    '5_of_diamonds',
    '5_of_hearts',
    '5_of_spades',
    '6_of_clubs',
    '6_of_diamonds',
    '6_of_hearts',
    '6_of_spades',
    '7_of_clubs',
    '7_of_diamonds',
    '7_of_hearts',
    '7_of_spades',
    '8_of_clubs',
    '8_of_diamonds',
    '8_of_hearts',
    '8_of_spades',
    '9_of_clubs',
    '9_of_diamonds',
    '9_of_hearts',
    '9_of_spades',
    '10_of_clubs',
    '10_of_diamonds',
    '10_of_hearts',
    '10_of_spades',
    'jack_of_clubs',
    'jack_of_diamonds',
    'jack_of_hearts',
    'jack_of_spades',
    'queen_of_clubs',
    'queen_of_diamonds',
    'queen_of_hearts',
    'queen_of_spades',
    'king_of_clubs',
    'king_of_diamonds',
    'king_of_hearts',
    'king_of_spades',
    'ace_of_clubs',
    'ace_of_diamonds',
    'ace_of_hearts',
    'ace_of_spades',
    'b_black_joker',
    'b_red_joker',
  ]

  flippedCards: CardData[] = [];

  matchedCount = 0;

  shuffleArray(anArray: any[]): any[] {
    return anArray.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }

  constructor(private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.setupCards();
  }

  setupCards(): void {
    this.cards = [];
    this.cardImages.forEach((image) => {
      if (image.endsWith("spades")) {
        this.cardColor = "black";

      } else if (image.endsWith("hearts")) {
        this.cardColor = "red";

      } else if (image.endsWith("diamonds")) {
        this.cardColor = "red"

      } else if (image.endsWith("clubs")) {
        this.cardColor = "black"

      } else {
        this.cardColor = "joker";
      }
      const cardData: CardData = {
        imageId: image,
        state: 'default',
        number: image.slice(0, 1),
        color: this.cardColor
      };

      this.cards.push({ ...cardData });

    });

    this.cards = this.shuffleArray(this.cards);
    console.log(this.cards);
  }

  cardClicked(index: number): void {
    const cardInfo = this.cards[index];

    if (cardInfo.state === 'default' && this.flippedCards.length < 2) {
      cardInfo.state = 'flipped';
      this.flippedCards.push(cardInfo);

      if (this.flippedCards.length > 1) {
        this.checkForCardMatch();
      }

    } else if (cardInfo.state === 'flipped') {
      cardInfo.state = 'default';
      this.flippedCards.pop();

    }
  }

  checkForCardMatch(): void {
    setTimeout(() => {
      const cardOne = this.flippedCards[0];
      const cardTwo = this.flippedCards[1];
      const nextState = (cardOne.color === cardTwo.color && cardOne.number === cardTwo.number) ? 'matched' : 'default';

      cardOne.state = cardTwo.state = nextState;
      console.log("cardOne",cardOne, 'cardTwo',cardTwo,'nextState', nextState,'cardOne.state', cardOne.state,'cardTwo.state', cardTwo.state)

      this.flippedCards = [];

      if (nextState === 'matched') {
        this.matchedCount++;
        const cardOneIndex = this.cards.indexOf(cardOne);
        const cardTwoIndex = this.cards.indexOf(cardTwo);
        console.log("index1", cardOneIndex, "index2", cardTwoIndex);
        this.cards.splice(cardOneIndex, 1);
        this.cards.splice(cardTwoIndex, 1);
        console.log(this.cards)

        // if (this.matchedCount === this.cardImages.length) {
        //   const dialogRef = this.dialog.open(RestartDialogComponent, {
        //     disableClose: true
        //   });

        //   dialogRef.afterClosed().subscribe(() => {
        //     this.restart();
        //   });
        // }
      }

    }, 1000);
  }

  restart(): void {
    this.matchedCount = 0;
    this.setupCards();
  }


}
