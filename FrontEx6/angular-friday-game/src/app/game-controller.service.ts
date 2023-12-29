import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { ICardThreat } from './cards/card.treat';
import { NextTurnDTO } from './game-domain/next-turn-dto';
import { GameDataService } from './game-data.service';
import { PlayerDTO } from './game-domain/player-dto';
import { ABILITY_CODE, CardAbilityActionAddCards, CardAbilityActionChangeLife, CardAbilityActionPhaseLess, ICardAbility, ICardAbilityAction } from './cards/card.ability';
import { TurnResultDTO } from './game-domain/turn-result-dto';
import { CardsForDestroySelector, ICardSelector } from './cards/card.selector';

export enum GAMEMODE {
  NONE = 0,
  GAME_START = 1,
  THREAT_SELECTION = 2,
  FIGHT = 3,  
  SELECT_CARDS = 4,
  DESTROY_CARDS = 5,  
  END_TURN = 6,
}

/*
export class FigthDTO {

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

  // current score to fight threat
  public currentScores: number = 0;
  // score for destroying cards
  public destoyPoints: number = 0;  
  
}
*/

export class CardAbilityContainer {

  public card: ICardAbility | undefined;

  public isFree: boolean = false;

  public isActivated: boolean = false;

  public canSelected: boolean = true;

  public isSelected: boolean = false;

  public currentScores: number = 0;

  constructor(isFree: boolean = false){
    this.isFree = isFree;
  }

  public SetCard(card: ICardAbility): void {
    
    this.card = card;
    
    this.Reset();
  }

  private Reset(): void {

    if(this.card !== undefined){
      this.currentScores = this.card.abilityValue;
    }else{
      this.currentScores = 0;
    }

    this.isActivated = false;
    this.canSelected = true;
    this.isSelected = false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class GameControllerService {

  public mode: Subject<GAMEMODE> = new Subject<GAMEMODE>();

  // player info
  public player: PlayerDTO = new PlayerDTO(0, 0)
  // turn info
  public turn: NextTurnDTO = new NextTurnDTO(this.player, 1, []);  

  // threat level
  public currentThreatLevel: number = 1;  
  // threat card selected for turn
  public currentThreatCard: ICardThreat = {} as ICardThreat;
  // reward ability for turn
  public currentRewardCard: ICardAbility | undefined = {} as ICardAbility;
  // free cards counter  
  public freeCardsCounter: number = 0;
  // additional free cards counter  
  public extraCardsCounter: number = 0;  

  // current set of ability cards  
  public abilityCardContainers: Array<CardAbilityContainer> = new Array<CardAbilityContainer>();
  // current set of actions
  public actions: Array<ICardAbilityAction> = new Array<ICardAbilityAction>();

  // score for destroying cards
  public destroyPoints: number = 0;

  // card selector
  public currentCardSelector: ICardSelector | undefined = undefined;

  // subscription on destroy cards after turn complete
  private cardDestroySubscription: Subscription = new Subscription();
  // cards destroyed on turn
  private destroyedCards: Array<ICardAbility> = new Array<ICardAbility>();
  
  constructor(private router: Router, private gameData: GameDataService) {}

  // return data for next turn
  public NextTurn(isNewGame: boolean = false): NextTurnDTO {

    // new game
    if(isNewGame){
      this.mode.next(GAMEMODE.GAME_START);
      console.log('mode: start game');      
  
      this.player = JSON.parse(this.gameData.StartNewGame()) as PlayerDTO;
    }    

    // next turn
    this.mode.next(GAMEMODE.THREAT_SELECTION);
    console.log('mode: next turn');    
  
    // setup interface for threat selection
    this.router.navigate(['/turn/next']);

    // setup threat level and player params from data source
    this.turn = JSON.parse(this.gameData.NextTurn()) as NextTurnDTO;   
    this.currentThreatLevel = this.turn.threatLevel;
    this.player = this.turn.player;    
    
    return this.turn;
  }

  // set threat card for turn and start fight
  public SetSelectedThreatCard(selectedCard: ICardThreat): void{
    
    this.mode.next(GAMEMODE.FIGHT);
    console.log('mode: fight start');
    
    this.currentThreatCard = selectedCard;  
    this.currentRewardCard = this.currentThreatCard.rewardCard;    
    this.abilityCardContainers = [];
    this.destroyedCards = []  
    this.actions = [];
    this.freeCardsCounter = this.currentThreatCard.freeCards;        
    this.extraCardsCounter = 0;
    this.destroyPoints = 0;

    console.log('game state');
    console.log(this);

    this.router.navigate(['/fightThreat']);
  }  

  private GetCardContainer(isFree: boolean = false): CardAbilityContainer {
    
    if(isFree){
      
      // find existing free container 
      let cardContainer: CardAbilityContainer | undefined = this.abilityCardContainers.find((container) => { return container.card === undefined && container.isFree});

      if(cardContainer === undefined){
        cardContainer = new CardAbilityContainer(true);
      }

      return cardContainer;

    } else {

      return new CardAbilityContainer();
    }
  }

  public CalcScores(): number {

    let scores = 0;

    for(let container of this.abilityCardContainers){
      if(container.card !== undefined){
        scores += container.currentScores;
      }
    }

    this.destroyPoints = this.currentThreatCard.levelValues[this.currentThreatLevel - 1] - scores;        

    console.log('scores = ' + scores.toString() + '/ destroy points = ' + this.destroyPoints.toString());    

    return scores;
  }

  // draw card from player deck
  public DrawAbilityCard(isExtraDraw: boolean = false): ICardAbility | undefined {    

    let cardContainer: CardAbilityContainer | undefined;

    // additional card
    if(isExtraDraw){

      if(this.extraCardsCounter > 0){    

        console.log('draw extra ability card for free');        

        this.extraCardsCounter--;           
        cardContainer = this.GetCardContainer();
                
      } else {        

        console.log('no extra cards available');

        return undefined;
      }

    // regular card
    }else{

      // free card 
      if(this.freeCardsCounter > 0){

        console.log('draw ability card for free');

        this.freeCardsCounter--;              
        cardContainer = this.GetCardContainer(true);

      // card for hp
      } else {      

        console.log('draw ability card for spending HP');

        this.player.currentPlayerHP--;
        cardContainer = this.GetCardContainer();     
      }
    }

    if(cardContainer === undefined) return undefined;

    // draw card from player deck
    let abilityCard: ICardAbility | undefined = this.RestoreAbilityCardFromDTO(this.gameData.DrawPlayerCard());
    if(abilityCard !== undefined){

      console.log(abilityCard);

      cardContainer.SetCard(abilityCard);      

      if(abilityCard.ability !== null){
        this.actions.push(abilityCard.ability);
      }            

      this.abilityCardContainers.push(cardContainer);      

      this.CalcScores();

      return abilityCard;  
    }
    
    console.log('can\'t draw card from player deck');

    return undefined;
  }

  public EndFight(){

    console.log('game state');
    console.log(this);

    // check win or lose
    if(this.destroyPoints > 0){
      
      console.log('lose fight');

      // subscribe on complete selection
      this.currentCardSelector = new CardsForDestroySelector(this.destroyPoints);
      this.cardDestroySubscription = this.currentCardSelector.isComplete.subscribe((complete) => {
        if(complete){
          this.currentCardSelector?.selected.forEach((container) => {
            if(container.card === undefined) return;
            this.destroyedCards.push(container.card);
          });
          this.cardDestroySubscription.unsubscribe();
          this.currentCardSelector = undefined;
          this.EndTurn();                    
        }  
      });
      
      this.mode.next(GAMEMODE.DESTROY_CARDS);        
      console.log('mode: destroy cards');

    }else{

      console.log('win fight');

      this.EndTurn();
    }
  }

  public EndTurn(): TurnResultDTO{

    this.mode.next(GAMEMODE.END_TURN);

    console.log('mode: end turn');
      
    console.log('destroyed cards');  
    console.log(this.destroyedCards);    

    let res = new TurnResultDTO();

    console.log('destroyed points');
    console.log(this.destroyPoints);

    if(this.destroyPoints > 0){
      this.player.currentPlayerHP -= this.destroyPoints;
    }

    res.isSuccess = this.destroyPoints <= 0;
    res.currentHP = this.player.currentPlayerHP;         
    
    if(res.isSuccess){

      this.abilityCardContainers.forEach((container) => {
        if(container.card === undefined) return;

        res.discardedAbility.push(container.card);        
      });

      if(this.currentRewardCard !== undefined){
        res.discardedAbility.push(this.currentRewardCard);
      }

      res.destroyedAbility = [];

      for(const threat of this.turn.threats){
        if(threat !== this.currentThreatCard){
          res.discardedThreat.push(threat);
        }
      }

      res.destroyedThreat.push(this.currentThreatCard);
    
    } else {
      
      console.log('discarded threats');
      console.log(this.turn.threats);
      
      this.abilityCardContainers.forEach((container) => {
        
        if(container.card === undefined) return;

        if(this.destroyedCards.includes(container.card)){
          res.destroyedAbility.push(container.card);
        }else{
          res.discardedAbility.push(container.card);
        }
      });

      res.discardedThreat.push(...this.turn.threats);

      res.destroyedThreat = [];
    }
  
    this.gameData.EndTurn(JSON.stringify(res));

    this.NextTurn();

    return res;
  }

  private RestoreAbilityCardFromDTO(cardDTO: string): ICardAbility | undefined {
    
    let card: ICardAbility = JSON.parse(cardDTO, (key, value) => {
      if(key === 'ability' && value !== null){
        switch (value.code) {
          case ABILITY_CODE.ADDLIFE:            
            value = Object.assign(new CardAbilityActionChangeLife(0), value);
            break;   
          case ABILITY_CODE.PHASELESS:            
            value = Object.assign(new CardAbilityActionPhaseLess, value);
            break; 
          case ABILITY_CODE.ADDCARDS:            
            value = Object.assign(new CardAbilityActionAddCards(0), value);
            break;                                                     
          default:
            break;
        }
      }       
      return value;
    }) as ICardAbility;

    return card;
  }

  public onDraw(isExtraDraw: boolean = false): void {
    this.DrawAbilityCard(isExtraDraw);
  }

  public onEndFight(){
    this.EndFight();
  }  

  public onEndTurn(){
    this.EndTurn();
  }

  public onTest(): void {

    /*
    */
  }  
}
