import { Component } from '@angular/core';
import { GameControllerService } from '../game-controller.service';
import { ICardAbilityAction } from '../cards/card.ability';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-player-controls',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './player-controls.component.html',
  styleUrl: './player-controls.component.css'
})
export class PlayerControlsComponent {

  constructor (public gameController: GameControllerService){    
  }

  public onDraw(): void {    
    this.gameController.onDraw();
  }

  public onAddDraw(): void {    
    this.gameController.onDraw(true);
  }  

  public onEndFight(){
    this.gameController.onEndFight();  
  }

  public onEndTurn(): void {    
    this.gameController.onEndTurn();
  }

  public GetDrawButtonText(){
    return this.gameController.freeCardsCounter > 0 ? 'Draw Card for FREE' : 'Draw Card for -1HP';
  }

  public GetExtraDrawButtonText(){
    return 'Draw extra card for FREE';
  }  

  public onTest(): void {    
    this.gameController.onTest();
  }

  public onAction(mycard: ICardAbilityAction){

    console.log('try to exec');
    console.log(mycard);    

    mycard.Exec(this.gameController);
  }
}
