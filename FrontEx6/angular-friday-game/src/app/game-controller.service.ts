import { Injectable } from '@angular/core';
import { ICardThreat } from './cards/card.treat';
import { Router } from '@angular/router';
import { NextTurnDTO } from './game-domain/next-turn-dto';
import { GameDataService } from './game-data.service';
import { PlayerDTO } from './game-domain/player-dto';
import { ICardAbility, ICardAbilityAction } from './cards/card.ability';

@Injectable({
  providedIn: 'root'
})
export class GameControllerService {

  // player info
  public player: PlayerDTO = new PlayerDTO(0, 0)
  // turn info
  public turn: NextTurnDTO = new NextTurnDTO(this.player, 1, []);  

  // threat level
  public currentThreatLevel: number = 1;
  // threat card selected for turn
  public currentThreatCard: ICardThreat = {} as ICardThreat;

  // free cards counter  
  public freeCardsCounter: number = 0;
  // current set of ability cards
  public abilityCards: Array<ICardAbility> = new Array<ICardAbility>();
  // current set of actions
  public actions: Array<ICardAbilityAction> = new Array<ICardAbilityAction>();

  // current score to fght threat
  public currentScores: number = 0;
  
  constructor(private router: Router, private gameData: GameDataService) {}

  // start new game
  public StartGame(): PlayerDTO {
    this.player = JSON.parse(this.gameData.StartNewGame()) as PlayerDTO;
    return this.player;
  }

  // return data for next turn
  public NextTurn(): NextTurnDTO {
    this.turn = JSON.parse(this.gameData.NextTurn()) as NextTurnDTO;    
    return this.turn;
  }

  public SetSelectedThreatCard(selectedCard: ICardThreat, unselected: Array<ICardThreat>): void{
    
    this.currentThreatCard = selectedCard;

    this.abilityCards = [];

    this.freeCardsCounter = this.currentThreatCard.freeCards;        
    this.currentScores = 0;

    this.router.navigate(['fightThreat']);

    // this.router.navigate(['/fightThreat', selectedCard.id.toString()]);
  }

  public DrawAbilityCard(): ICardAbility {

    if(this.freeCardsCounter > 0){
      this.freeCardsCounter--;
      console.log('draw ability card for free');
    }else{      
      this.player.currentPlayerHP--;
      console.log('draw ability card for spending HP');
    }

    let abilityCard = JSON.parse(this.gameData.DrawAbilityCard()) as ICardAbility;
    this.abilityCards.push(abilityCard);    

    this.currentScores += abilityCard.abilityValue;

    if(abilityCard.ability !== null){
      this.actions.push(abilityCard.ability);
    }

    console.log(abilityCard);

    return abilityCard;
  }

  public onDraw(): void {
    this.DrawAbilityCard();
  }

  public onTest(): void {

    /*
    this.drawAbilityCard.next(
      { 
          id: 213, 
          name: 'realization', 
          abilityValue: 1, 
          ability: new CardAbilityAction1xDestroy(),
          discardCost: 1
      });
    */
  }
}
