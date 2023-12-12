import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PlayerControlsComponent } from './player-controls/player-controls.component';
import { CardAbilityComponent } from './card-ability/card-ability.component';
import { ThreatFightingDisplayComponent } from './threat-fighting-display/threat-fighting-display.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PlayerControlsComponent, CardAbilityComponent, ThreatFightingDisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-friday-game';
}
