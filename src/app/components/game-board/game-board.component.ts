
import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Player } from 'src/app/interfaces/player.interface';
import { RestartDialogComponent } from 'src/app/modals/restart-dialog-component/restart-dialog-component.component';
import { changeState } from 'src/app/state/game-state/game-state.actions';
import { increment1, increment2, reset } from 'src/app/state/score-counter/score-counter.actions';

import { CardData } from './../../interfaces/cardData.interface';


@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  @Input() cPlayer: number;
  @Output() cPlayerChanged: EventEmitter<number> = new EventEmitter();

  @Input() gState: string;
  @Output() gameStateChanged: EventEmitter<string> = new EventEmitter();

  cards: CardData[] = [];
  cardColor: string;
  blankCard: CardData = {
    imageId: 'none',
    state: 'removed',
    number: '0',
    color:"none"

  };

  winningPlayer: string = '';
  losingPlayer: string = '';

  player1: Player = {
    number: 1,
    points: 0
  }

   player2: Player = {
    number: 2,
    points: 0
  }

  players: Player[] = [];
  currentPlayer: number;
  playerIndex: number;

  counter1: number;
  counter2: number;

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

  displayStyle = "none";

  shuffleArray(anArray: any[]): any[] {
    return anArray.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }

  constructor(private dialog: MatDialog,
    private store1: Store<{ counter1: { counter1: number } }>,
    private store2: Store<{ counter2: { counter2: number } }>,
    private router: Router,
    private gameStateStore: Store<{ currentState: { currentState: string } }>
  ) {

  }

  ngOnInit(): void {
    this.setupCards();
    this.players.push(this.player1);
    this.players.push(this.player2);
    this.currentPlayer = 1;
  }

  nextPlayer() {
    if (this.currentPlayer === 1) {
      this.currentPlayer = 2;
      this.playerIndex = 1;
      this.cPlayerChanged.emit(this.currentPlayer)
    }
    else {
      this.currentPlayer = 1;
      this.playerIndex = 0;
      this.cPlayerChanged.emit(this.currentPlayer);
    }
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

  }

  cardClicked(index: number): void {
    this.playerIndex = this.currentPlayer - 1;
    const cardInfo = this.cards[index];
    if (cardInfo.state === 'default' && this.flippedCards.length < 2) {
      cardInfo.state = 'flipped';
      this.flippedCards.push(cardInfo);

      if (this.flippedCards.length > 1) {
        this.checkForCardMatch(index);
      }

    } else if (cardInfo.state === 'flipped') {
      cardInfo.state = 'default';
      this.flippedCards.pop();
    }
  }

  checkForCardMatch(index): void {
    setTimeout(() => {
      const cardOne = this.flippedCards[0];
      const cardTwo = this.flippedCards[1];
      const nextState = (cardOne.color === cardTwo.color && cardOne.number === cardTwo.number) ? 'matched' : 'default';

      cardOne.state = cardTwo.state = nextState;
      this.flippedCards = [];

      if (nextState === 'matched') {
        if (this.players[this.playerIndex].number === 1)
          this.store1.dispatch(increment1());
        else
          this.store2.dispatch(increment2());
        const cardOneIndex = this.cards.indexOf(cardOne);
        const cardTwoIndex = this.cards.indexOf(cardTwo);

        var element1 = document.getElementById(cardOneIndex.toString());
        element1.style.opacity = "0";

        var element2 = document.getElementById(cardTwoIndex.toString());
        element2.style.opacity = "0";

        this.openPopup();

        if (this.matchedCount === this.cardImages.length) {
          const dialogRef = this.dialog.open(RestartDialogComponent, {
            disableClose: true
          });

          dialogRef.afterClosed().subscribe(() => {
            this.restartClicked();
          });
        }
      }
      this.store1.select('counter1').subscribe(data => {
        this.counter1 = data.counter1;
      });

      this.store2.select('counter2').subscribe(data => {
        this.counter2 = data.counter2;
      });

    this.checkMatchedCount(this.counter1, this.counter2);
      this.nextPlayer();
    }, 1000)


  }

  restartClicked(): void {
    this.store1.dispatch(reset());
    this.setupCards();
    for (let x = 0; x < this.cards.length; x++){
      var element1 = document.getElementById(x.toString());
      element1.style.opacity = "1";
      this.cards[x].state = 'default';
    }

    location.reload();
  }

  checkMatchedCount(count1: number, count2: number) {
    if ((count1 + count2) == 1) {
      this.gameStateStore.dispatch(changeState())
      if (count1 > count2) {
        this.winningPlayer = sessionStorage.getItem("player1");
        this.losingPlayer = sessionStorage.getItem("player2");

        sessionStorage.setItem("winCount", count1.toString());
        sessionStorage.setItem("loseCount", count2.toString());
        sessionStorage.setItem("winningPlayer", this.winningPlayer);
        sessionStorage.setItem("losingPlayer", this.losingPlayer);
      }
      else {
        this.winningPlayer = sessionStorage.getItem("player2")
        this.losingPlayer = sessionStorage.getItem("player1");

        sessionStorage.setItem("winCount", count2.toString());
        sessionStorage.setItem("loseCount", count1.toString());
        sessionStorage.setItem("winningPlayer", this.winningPlayer);
        sessionStorage.setItem("losingPlayer", this.losingPlayer);
      }

      this.router.navigate(['/result']);
    }




  }

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }




}


