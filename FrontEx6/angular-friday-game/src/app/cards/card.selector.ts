import { ICardAbility } from "./card.ability";

export interface ICardSelector {

    selected: Array<ICardAbility>;

    Init(points: number): void;

    CanSelected(card: ICardAbility): boolean;

    SelectCard(card: ICardAbility): void;

}

export class DestroyedCardSelector implements ICardSelector {
    
    private discardPoints: number = 0;

    selected: Array<ICardAbility> = new Array<ICardAbility>();
    
    constructor (discardPoints: number){        
        this.Init(discardPoints);
    }

    public Init(discardPoints: number): void{
        this.selected = [];
        this.discardPoints = discardPoints;
    }

    public CanSelected(card: ICardAbility): boolean {
        return card.discardCost <= this.discardPoints;        
    }
    
    public SelectCard(card: ICardAbility): void {
        if(this.CanSelected(card) && !this.selected.includes(card)){
            this.discardPoints -= card.discardCost;
            this.selected.push(card);
        }
    }
}