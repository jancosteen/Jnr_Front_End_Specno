import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { ResultsComponent } from './components/results/results.component';
import { StartPageComponent } from './components/start-page/start-page.component';


const routes: Routes = [
  { path: '', component: StartPageComponent },
  { path: 'start', component: StartPageComponent },
  { path: 'game', component: GameComponent },
  { path: 'result', component: ResultsComponent},
  { path: '**', redirectTo: 'start', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
