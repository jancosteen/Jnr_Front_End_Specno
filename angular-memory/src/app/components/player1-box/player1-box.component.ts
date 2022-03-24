import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-player1-box',
  templateUrl: './player1-box.component.html',
  styleUrls: ['./player1-box.component.scss']
})
export class Player1BoxComponent implements OnInit {

  counter1: number;
  player1Name: string;
  constructor(private store1: Store<{ counter1: { counter1: number } }>) { }

  ngOnInit(): void {
    this.player1Name = sessionStorage.getItem("player1");
    this.store1.select('counter1').subscribe(data => {
      this.counter1 = data.counter1;
    });
  }

}
