import { Component } from '@angular/core';
import { PlayerControlsComponent } from '../player-controls/player-controls.component';
import { PlayerDisplayComponent } from '../player-display/player-display.component';
import { CardsDisplayComponent } from '../cards-display/cards-display.component';
import { ThreatDisplayComponent } from '../threat-display/threat-display.component';

@Component({
  selector: 'app-threat-fighting-display',
  standalone: true,
  imports: [ThreatDisplayComponent, PlayerControlsComponent, PlayerDisplayComponent, CardsDisplayComponent],
  templateUrl: './threat-fighting-display.component.html',
  styleUrl: './threat-fighting-display.component.css'
})
export class ThreatFightingDisplayComponent {

}
