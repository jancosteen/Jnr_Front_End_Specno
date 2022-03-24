import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardComponent } from './components/card/card.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import { RestartDialogComponent } from './modals/restart-dialog-component/restart-dialog-component.component';
import { StoreModule } from '@ngrx/store';
import { scoreCounter1Reducer } from './state/score-counter/score-counter1.reducer';
import { scoreCounter2Reducer } from './state/score-counter/score-counter2.reducer';
import { Player1BoxComponent } from './components/player1-box/player1-box.component';
import { Player2BoxComponent } from './components/player2-box/player2-box.component';
import { GameComponent } from './components/game/game.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { FormsModule } from '@angular/forms';
import { gameStateReducer } from './state/game-state/game-state.reducer';
import { ResultsComponent } from './components/results/results.component';




@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    GameBoardComponent,
    RestartDialogComponent,
    Player1BoxComponent,
    Player2BoxComponent,
    GameComponent,
    StartPageComponent,
    ResultsComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatDialogModule,
    StoreModule.forRoot({
      counter1: scoreCounter1Reducer,
      counter2: scoreCounter2Reducer,
      currentState: gameStateReducer

    }),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
