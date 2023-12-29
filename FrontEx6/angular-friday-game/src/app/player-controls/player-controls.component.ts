import { Component } from '@angular/core';
import { GAMEMODE, GameControllerService } from '../game-controller.service';
import { ICardAbilityAction } from '../cards/card.ability';
import { NgFor, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { ICardSelector } from '../cards/card.selector';

@Component({
  selector: 'app-player-controls',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './player-controls.component.html',
  styleUrl: './player-controls.component.css'
})
export class PlayerControlsComponent {

  private modeChangeSubscription: Subscription = new Subscription();

  public mode: GAMEMODE = GAMEMODE.FIGHT;

  public selector: ICardSelector | undefined = undefined;  

  constructor (public gameController: GameControllerService){    
  }

  ngOnInit(){
    this.modeChangeSubscription = this.gameController.mode.subscribe((mode) => {
      this.onModeChange(mode);      
    })
  }

  ngOnDestroy(){
    console.log('card display unsubscribe mode change event');
    this.modeChangeSubscription.unsubscribe();
  }

  private onModeChange(mode: GAMEMODE): void {

    if(mode === GAMEMODE.DESTROY_CARDS || mode === GAMEMODE.SELECT_CARDS){
      this.selector = this.gameController.currentCardSelector;
    }else{
      this.selector = undefined;
    }
    
    this.mode = mode;
  }  

  public onDraw(): void {    
    this.gameController.onDraw();
  }

  public onAddDraw(): void {    
    this.gameController.onDraw(true);
  }  

  public onEndFight(): void {
    this.gameController.onEndFight();  
  }

  public onAction(mycard: ICardAbilityAction): void {

    console.log('try to exec');
    console.log(mycard);    

    mycard.Exec(this.gameController);
  }

  public onConfirmSelection(): void {
    
    if(this.gameController.currentCardSelector === undefined) return;

    this.gameController.currentCardSelector.Confirm();
  }

  public GetDrawButtonText(){
    return (this.gameController.freeCardsCounter > 0 ? 'Draw Card for FREE' : 'Draw Card for -1HP');
  }

  public GetExtraDrawButtonText(): string {
    return 'Draw extra card for FREE';
  }  

  public onEndTurn(): void {    
    this.gameController.onEndTurn();
  }

  public onTest(): void {    
    this.gameController.onTest();
  }

}
