import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { GameBoardComponent } from './components/game-board/game-board.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[GameBoardComponent]
})
export class AppComponent {
  title = 'angular-memory';
  counter1: number;
  counter2: number;

  constructor(private comp: GameBoardComponent,
    private store1: Store<{ counter1: { counter1: number } }>,
    private store2: Store<{ counter2: { counter2: number } }>) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.store1.select('counter1').subscribe(data => {
      this.counter1 = data.counter1;
    });

    this.store2.select('counter2').subscribe(data => {
      this.counter2 = data.counter2;
    });
  }


  restart() {
    this.comp.restartClicked();
    console.log(this.counter1);
  }


}
