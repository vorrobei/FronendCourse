import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { PlayerControlsComponent } from './player-controls/player-controls.component';
import { routes } from './app.routes';
import { ICardThreat } from './cards/card.treat';
import { ThreatCards } from './cards/card.threat.deck.mock';
import { CardThreatComponent } from './card-threat/card-threat.component';
import { GameControllerService } from './game-controller.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PlayerControlsComponent, CardThreatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {  

  protected title = 'angular-friday-game';  

  constructor(private gameController: GameControllerService) {}

  ngOnInit(){
    this.gameController.NextTurn(true);    
  }
}
