import { GameControllerService } from "../game-controller.service";

export enum ABILITY_CODE {
    NONE,
    ADD2LIVES,
    ADD1LIFE,
    EXCHANGE1,
    EXCHANGE2,
    COPY,
    BELOWTHEPILE,
    DESTROY,
    PHASELESS,
    ADD2CARDS,
    ADD1CARD,
    DOUBLE,
    SORT3CARS
}

export interface ICardAbilityAction {    

    readonly code: ABILITY_CODE;

    readonly name: string;    

    isActivated: boolean;    
    
    Exec: (gameController: GameControllerService) => void;

}

export interface ICardAbility {

    id: number

    name: string;

    abilityValue: number;

    ability: ICardAbilityAction | null;

    discardCost: number;

}

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

export class CardAbilityActionPhaseLess implements ICardAbilityAction {

    code: ABILITY_CODE = ABILITY_CODE.PHASELESS;

    name: string = 'phase -1';

    isActivated: boolean = false;

    Exec(gameController: GameControllerService): void {
        throw new Error("Method not implemented.");
    }
}

export class CardAbilityAdd1Life implements ICardAbilityAction {

    code: ABILITY_CODE = ABILITY_CODE.ADD1LIFE;

    name: string = '+1 life';

    isActivated: boolean = false;

    Exec(gameController: GameControllerService): void {
        throw new Error("Method not implemented.");
    }
}

export class CardAbilityAdd2Life implements ICardAbilityAction {

    public readonly code: ABILITY_CODE = ABILITY_CODE.ADD2LIVES;

    public readonly name: string = '+2 lives';

    isActivated: boolean = false;

    constructor () {}

    public Exec(gameController: GameControllerService): void {

        if(gameController !== null && !this.isActivated){                                

            gameController.player.currentPlayerHP += 2;
            
            if(gameController.player.currentPlayerHP > gameController.player.maxPlayerHP){
                gameController.player.currentPlayerHP = gameController.player.maxPlayerHP;
            }

            this.isActivated = true;
        }
    }
}

export class CardAbilityActionAdd2Cards implements ICardAbilityAction {

    code: ABILITY_CODE = ABILITY_CODE.ADD2CARDS;

    name: string = '+2 cards';

    isActivated: boolean = false;

    Exec(gameController: GameControllerService): void {
        throw new Error("Method not implemented.");
    }
}

export class CardAbilityActionAdd1Cards implements ICardAbilityAction {

    code: ABILITY_CODE = ABILITY_CODE.ADD1CARD;

    name: string = '+1 card';

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

export class CardAbilityAction1xDouble implements ICardAbilityAction {

    code: ABILITY_CODE = ABILITY_CODE.DOUBLE;

    name: string = '1x double';

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