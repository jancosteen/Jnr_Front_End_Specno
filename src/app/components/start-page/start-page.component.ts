import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {

  player1Name: string
  player2Name: string
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  clickStart(name1: string, name2: string) {
    console.log(this.player1Name, this.player2Name);
    if (name1 === undefined)
      sessionStorage.setItem("player1", "Player 1");
    else
    sessionStorage.setItem("player1", name1);

    if (name2 === undefined)
      sessionStorage.setItem("player2", "Player 2");
    else
    sessionStorage.setItem("player2", name2);
    this.router.navigate(['/game']);

  }

}
