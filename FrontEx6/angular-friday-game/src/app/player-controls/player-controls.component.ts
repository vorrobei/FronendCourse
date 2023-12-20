import { Component } from '@angular/core';
import { GameControllerService } from '../game-controller.service';
import { CardAbilityAdd2Life, ICardAbilityAction } from '../cards/card.ability';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-player-controls',
  standalone: true,
  imports: [NgFor],
  templateUrl: './player-controls.component.html',
  styleUrl: './player-controls.component.css'
})
export class PlayerControlsComponent {

  constructor (public gameController: GameControllerService){    
  }

  public onDraw(): void {    
    this.gameController.onDraw();
  }

  public onEndFight(){
    this.gameController.onEndFight();  
  }

  public onEndTurn(): void {    
    this.gameController.onEndTurn();
  }

  public onTest(): void {    
    this.gameController.onTest();
  }

  public onAction(mycard: CardAbilityAdd2Life){

    if(mycard instanceof CardAbilityAdd2Life){
      console.log('try to exec');
    }
    console.log(mycard);    
    mycard.Exec(this.gameController);
  }
}
