import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CardsDisplayComponent } from './cards-display/cards-display.component';
import { PlayerControlsComponent } from './player-controls/player-controls.component';
import { CardAbilityComponent } from './card-ability/card-ability.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CardsDisplayComponent, PlayerControlsComponent, CardAbilityComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-friday-game';
}
