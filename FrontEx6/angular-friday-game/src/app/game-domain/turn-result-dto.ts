import { ICardAbility } from "../cards/card.ability";
import { ICardThreat } from "../cards/card.treat";

export class TurnResultDTO {
    
    public isSuccess: boolean = false;

    public currentHP: number = 0;

    public discardedAbility: Array<ICardAbility> = new Array<ICardAbility>();

    public destroyedAbility: Array<ICardAbility> = new Array<ICardAbility>();

    public discardedThreat: Array<ICardThreat> = new Array<ICardThreat>();

    public destroyedThreat: Array<ICardThreat> = new Array<ICardThreat>();    

    constructor (){        
    }
}