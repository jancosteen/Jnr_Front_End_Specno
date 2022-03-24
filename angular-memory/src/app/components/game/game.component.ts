import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { changeState } from 'src/app/state/game-state/game-state.actions';
import { GameBoardComponent } from '../game-board/game-board.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  counter1: number;
  counter2: number;
  currentPlayer: number = 1;
  gameState: string = "busy";
  constructor(private comp: GameBoardComponent,
    private store1: Store<{ counter1: { counter1: number } }>,
    private store2: Store<{ counter2: { counter2: number } }>,
    private router: Router,
    private gameStateStore: Store<{ currentState: { currentState: string } }>
  )  { }

  ngOnInit(): void {
    this.store1.select('counter1').subscribe(data => {
      this.counter1 = data.counter1;
    });

    this.store2.select('counter2').subscribe(data => {
      this.counter2 = data.counter2;
    });

    this.gameStateStore.select('currentState').subscribe(data => {
      this.gameState = data.currentState;
    });
  }

  restart() {
    this.comp.restartClicked();
    console.log(this.counter1);
  }

  exitClicked() {
    this.router.navigate(['/start']);
  }

  playerChangedHandler(cPlayer: number) {
    this.currentPlayer = cPlayer;
    console.log("player",cPlayer);
  }

  gameStateHandler(gameState: string) {
    this.gameState = gameState;
    console.log("gameState", this.gameState)
  }



}
