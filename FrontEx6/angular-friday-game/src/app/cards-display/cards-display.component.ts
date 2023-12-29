import { Component } from '@angular/core';
import { GAMEMODE, GameControllerService } from '../game-controller.service';
import { NgFor, NgIf } from '@angular/common';
import { CardAbilityComponent } from '../card-ability/card-ability.component';
import { Subscription } from 'rxjs';
import { CardAbilityShadowComponent } from '../card-ability-shadow/card-ability-shadow.component';
import { ICardSelector } from '../cards/card.selector';

@Component({
  selector: 'app-cards-display',
  standalone: true,
  imports: [NgFor, NgIf, CardAbilityComponent, CardAbilityShadowComponent],
  templateUrl: './cards-display.component.html',
  styleUrl: './cards-display.component.css'
})
export class CardsDisplayComponent {

  private modeChangeSubscription: Subscription = new Subscription();

  public mode: GAMEMODE = GAMEMODE.FIGHT;

  public selector: ICardSelector | undefined = undefined;

  constructor(public gameController: GameControllerService) {}

  private onModeChange(mode: GAMEMODE): void {

    if(mode === GAMEMODE.DESTROY_CARDS || mode === GAMEMODE.SELECT_CARDS){
      this.selector = this.gameController.currentCardSelector;
    }else{
      this.selector = undefined;
    }
    
    this.mode = mode;
  }

  public ngOnInit(){
    this.modeChangeSubscription = this.gameController.mode.subscribe((mode) => {
      this.onModeChange(mode);      
    })
  }

  public ngOnDestroy(){
    console.log('card display unsubscribe mode change event');
    this.modeChangeSubscription.unsubscribe();
  }
}
