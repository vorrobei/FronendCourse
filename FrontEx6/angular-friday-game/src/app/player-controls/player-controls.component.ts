import { Component } from '@angular/core';
import { GameControllerService } from '../game-controller.service';
import { ICardAbilityAction } from '../cards/card.ability';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-player-controls',
  standalone: true,
  imports: [NgFor],
  templateUrl: './player-controls.component.html',
  styleUrl: './player-controls.component.css'
})
export class PlayerControlsComponent {

  public actions: Array<ICardAbilityAction> = new Array<ICardAbilityAction>();

  constructor (public gameController: GameControllerService){    
  }

  public onDraw(): void {    
    this.gameController.onDraw();
  }

  public onTurnEnd(): void {    
    this.gameController.onTest();
  }

  public onTest(): void {    
    this.gameController.onTest();
  }
}
