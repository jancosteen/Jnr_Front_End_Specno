import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  winningPlayer: string;
  losingPlayer: string;
  winCount: string;
  loseCount: string;
  constructor(private store1: Store<{ counter1: { counter1: number } }>,
    private store2: Store<{ counter2: { counter2: number } }>) { }

  ngOnInit(): void {
    this.winningPlayer = sessionStorage.getItem("winningPlayer");
    this.losingPlayer = sessionStorage.getItem("losingPlayer");

    this.winCount = sessionStorage.getItem("winCount");
    this.loseCount = sessionStorage.getItem("loseCount");


  }

}
