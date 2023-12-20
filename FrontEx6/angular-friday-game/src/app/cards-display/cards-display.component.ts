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

  private modeChangeSubscription: Subscription = new Subscription();;

  public mode: GAMEMODE = GAMEMODE.FIGHT;

  public selector: ICardSelector | null = null;

  constructor(public gameController: GameControllerService) {}

  private onModeChange(mode: GAMEMODE): void {

    if(mode === GAMEMODE.DISCARD_CARDS){
      this.selector = this.gameController.GetCardSelector();
    }else{
      this.selector = null;
    }

    console.log('on mode change');
    console.log(mode);
    
    this.mode = mode;
  }

  ngOnInit(){
    this.modeChangeSubscription = this.gameController.mode.subscribe((mode) => {
      this.onModeChange(mode);      
    })
  }

  ngOnDestroy(){
    console.log('unsubscribe');
    this.modeChangeSubscription.unsubscribe();
  }
}
