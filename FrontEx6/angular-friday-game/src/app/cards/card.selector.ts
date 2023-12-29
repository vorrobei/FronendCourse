import { Subject } from "rxjs";
import { CardAbilityContainer } from "../game-controller.service";

export interface ICardSelector {

    title: string;

    selected: Array<CardAbilityContainer>;

    isComplete: Subject<boolean>;

    Init(points: number): void;

    CanSelected(container: CardAbilityContainer | undefined): boolean;

    SelectCard(container: CardAbilityContainer | undefined): void;

    Confirm(): void;
}

export class SingleCardSelector implements ICardSelector {
    
    private cardCount: number = 0;

    public title: string = 'select';
    
    public selected: Array<CardAbilityContainer> = new Array<CardAbilityContainer>();

    public isComplete: Subject<boolean> = new Subject<boolean>();

    constructor (operationTitle: string, cardCount: number = 1) {
        this.title = operationTitle;
        this.Init(cardCount);
    }

    public Init(points: number): void {
        this.cardCount = points;
        this.selected = [];

        this.isComplete.next(false);
    }
    
    public CanSelected(container: CardAbilityContainer | undefined): boolean {

        if(container === undefined) return false;

        return container.canSelected;
    }
    
    SelectCard(container: CardAbilityContainer | undefined): void {
        
        if(container === undefined || container.card === undefined) return;

        // if always selected = cancel selection
        if(this.selected.includes(container)){

            this.cardCount++;
            container.isSelected = false;
            this.selected.splice(this.selected.indexOf(container), 1);
        }else{

            if(this.CanSelected(container)){
                this.cardCount--;
                container.isSelected = true;
                this.selected.push(container);
            }
        }
    }
    
    Confirm(): void {
        this.isComplete.next(true);
    }   
}

export class CardsForDestroySelector implements ICardSelector {
        
    private destroyPoints: number = 0;

    public readonly title: string = 'destroy';

    public selected: Array<CardAbilityContainer> = new Array<CardAbilityContainer>();

    public isComplete: Subject<boolean> = new Subject<boolean>();
    
    constructor (destroyPoints: number){        
        this.Init(destroyPoints);
    }

    public Init(destroyPoints: number): void{
        this.selected = [];
        this.destroyPoints = destroyPoints;

        this.isComplete.next(false);
    }
    
    public CanSelected(container: CardAbilityContainer | undefined): boolean {

        if(container === undefined || container.card === undefined) return false;

        return container.card.discardCost <= this.destroyPoints;        
    }
    
    public SelectCard(container: CardAbilityContainer | undefined): void {

        if(container === undefined || container.card === undefined) return;

        // if always selected = cancel selection
        if(this.selected.includes(container)){

            this.destroyPoints += container.card.discardCost;
            container.isSelected = false;
            this.selected.splice(this.selected.indexOf(container), 1);
        }else{

            if(this.CanSelected(container)){
                this.destroyPoints -= container.card.discardCost;
                container.isSelected = true;
                this.selected.push(container);
            }
        }
    }    

    public Confirm(): void {
        this.isComplete.next(true);
    }

}