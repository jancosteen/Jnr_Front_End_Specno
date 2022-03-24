import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-player2-box',
  templateUrl: './player2-box.component.html',
  styleUrls: ['./player2-box.component.scss']
})
export class Player2BoxComponent implements OnInit {
  counter2: number;
  player2Name: string;
  constructor(private store2: Store<{ counter2: { counter2: number } }>) { }

  ngOnInit(): void {
    this.player2Name = sessionStorage.getItem("player2");
    this.store2.select('counter2').subscribe(data => {
      this.counter2 = data.counter2;
    });
  }

}
