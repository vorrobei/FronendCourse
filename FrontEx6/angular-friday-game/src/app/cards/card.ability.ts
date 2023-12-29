import { GameControllerService } from "../game-controller.service";
import { ICard } from "./card";

export enum ABILITY_CODE {
    NONE,
    ADDLIFE,    
    PHASELESS,
    ADDCARDS, 

    CARDZERO,
    STOP,
    // select card
    EXCHANGE1,
    EXCHANGE2,
    COPY,
    BELOWTHEPILE,
    DESTROY,    
    DOUBLE,    
    SORT3CARS,    
}

export interface ICardAbilityAction {    

    readonly code: ABILITY_CODE;

    readonly name: string;    

    isActivated: boolean;   
    
    Exec: (gameController: GameControllerService) => void;

}

export interface ICardAbility extends ICard {
    
    /*
    id: number

    name: string;
    */

    abilityValue: number;

    ability: ICardAbilityAction | null;

    discardCost: number;

}

export class CardAbilityActionChangeLife implements ICardAbilityAction {

    public code: ABILITY_CODE = ABILITY_CODE.ADDLIFE;

    public name: string = 'life';    

    public isActivated: boolean = false; 

    private lifePoints: number;

    constructor (lifePoints: number) {
        this.lifePoints = lifePoints;        
        this.name = (this.lifePoints < 0 ? '' : '+') + this.lifePoints.toString() + ' life';
    }

    public Exec(gameController: GameControllerService): void {

        if(gameController === null || this.isActivated) return;                                

        gameController.player.currentPlayerHP += this.lifePoints;
        
        if(gameController.player.currentPlayerHP > gameController.player.maxPlayerHP){
            gameController.player.currentPlayerHP = gameController.player.maxPlayerHP;
        }

        if(gameController.player.currentPlayerHP < 0){
            gameController.player.currentPlayerHP = 0;
        }

        this.isActivated = true;        
    }
}

export class CardAbilityActionPhaseLess implements ICardAbilityAction {

    public code: ABILITY_CODE = ABILITY_CODE.PHASELESS;

    public name: string = 'phase -1';

    public isActivated: boolean = false;

    public Exec(gameController: GameControllerService): void {

        if(gameController === null || this.isActivated) return;     

        if(gameController.currentThreatLevel > 1) {
            gameController.currentThreatLevel--;

            console.log('reduce threat level');
            console.log('current level: ' + gameController.currentThreatLevel.toString());
        }

        this.isActivated = true;        
    }
}

export class CardAbilityActionAddCards implements ICardAbilityAction {

    public code: ABILITY_CODE = ABILITY_CODE.ADDCARDS;

    public name: string = 'card';

    public isActivated: boolean = false;

    private extraCards: number;

    constructor (extraCards: number) {
        this.extraCards = extraCards;        
        this.name = '+' + this.extraCards + (this.extraCards > 1 ? ' cards' : ' card');
    }    

    public Exec(gameController: GameControllerService): void {

        if(gameController === null || this.isActivated) return;     

        gameController.extraCardsCounter += this.extraCards;

        console.log('extra cards draw points');
        console.log('points: ' + gameController.extraCardsCounter.toString());

        this.isActivated = true;        
    }
}

export class CardAbilityAction1xDouble implements ICardAbilityAction {

    code: ABILITY_CODE = ABILITY_CODE.DOUBLE;

    name: string = '1x double';

    isActivated: boolean = false;

    Exec(gameController: GameControllerService): void {
        throw new Error("Method not implemented.");
    }
}

/*
export class CardAbilityActionCopy implements ICardAbilityAction {

    public readonly code: ABILITY_CODE = ABILITY_CODE.COPY;

    public readonly name: string = 'copy';    

    isActivated: boolean = false;

    Exec(gameController: GameControllerService): void {
        throw new Error("Method not implemented.");
    }
}

export class CardAbilityAction1xBelowThePile implements ICardAbilityAction {

    public readonly code: ABILITY_CODE = ABILITY_CODE.BELOWTHEPILE;

    public readonly name: string = '1x below the pile';

    isActivated: boolean = false;    

    Exec(gameController: GameControllerService): void {
        throw new Error("Method not implemented.");
    }
}

export class CardAbilityAction1xDestroy implements ICardAbilityAction {

    code: ABILITY_CODE = ABILITY_CODE.DESTROY;

    name: string = '1x destroy';

    isActivated: boolean = false;

    Exec(gameController: GameControllerService): void {
        throw new Error("Method not implemented.");
    }
}

export class CardAbilityAction2xExchange implements ICardAbilityAction {

    code: ABILITY_CODE = ABILITY_CODE.EXCHANGE2;

    name: string = '2x exchange';

    isActivated: boolean = false;

    Exec(gameController: GameControllerService): void {
        throw new Error("Method not implemented.");
    }
}

export class CardAbilityAction1xExchange implements ICardAbilityAction {

    code: ABILITY_CODE = ABILITY_CODE.EXCHANGE1;

    name: string = '1x exchange';

    isActivated: boolean = false;

    Exec(gameController: GameControllerService): void {
        throw new Error("Method not implemented.");
    }
}


export class CardAbilityActionSort3Card implements ICardAbilityAction {

    code: ABILITY_CODE = ABILITY_CODE.SORT3CARS;

    name: string = 'sort 3 cards';

    isActivated: boolean = false;

    Exec(gameController: GameControllerService): void {
        throw new Error("Method not implemented.");
    }
}

export class CardAbilityActionHighestCardZero implements ICardAbilityAction {

    code: ABILITY_CODE = ABILITY_CODE.CARDZERO;

    name: string = 'highest card = 0';

    isActivated: boolean = false;

    Exec(gameController: GameControllerService): void {
        throw new Error("Method not implemented.");
    }
}

export class CardAbilityActionStop implements ICardAbilityAction {

    code: ABILITY_CODE = ABILITY_CODE.STOP;

    name: string = 'stop';

    isActivated: boolean = false;

    Exec(gameController: GameControllerService): void {
        throw new Error("Method not implemented.");
    }
}

*/