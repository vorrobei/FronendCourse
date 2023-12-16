import { Component } from '@angular/core';
import { GameControllerService } from '../game-controller.service';
import { NgFor } from '@angular/common';
import { CardAbilityComponent } from '../card-ability/card-ability.component';

@Component({
  selector: 'app-cards-display',
  standalone: true,
  imports: [NgFor, CardAbilityComponent],
  templateUrl: './cards-display.component.html',
  styleUrl: './cards-display.component.css'
})
export class CardsDisplayComponent {

  constructor(public gameController: GameControllerService) {}

}
