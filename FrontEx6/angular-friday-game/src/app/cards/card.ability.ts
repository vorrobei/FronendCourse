export interface ICardAbilityAction {    

    name: string;    

    Exec(): void;

}

export interface ICardAbility {

    id: number

    name: string;

    abilityValue: number;

    ability: ICardAbilityAction | null;

    discardCost: number;

}

export class CardAbilityActionCopy implements ICardAbilityAction {

    name: string = 'copy';

    Exec(): void {
        throw new Error("Method not implemented.");
    }
}

export class CardAbilityAction1xBelowThePile implements ICardAbilityAction {

    name: string = '1x below the pile';

    Exec(): void {
        throw new Error("Method not implemented.");
    }
}

export class CardAbilityAction1xDestroy implements ICardAbilityAction {

    name: string = '1x destroy';

    Exec(): void {
        throw new Error("Method not implemented.");
    }
}

export class CardAbilityActionPhaseLess implements ICardAbilityAction {

    name: string = 'phase -1';

    Exec(): void {
        throw new Error("Method not implemented.");
    }
}

export class CardAbilityAdd1Life implements ICardAbilityAction {

    name: string = '+1 life';

    Exec(): void {
        throw new Error("Method not implemented.");
    }
}

export class CardAbilityAdd2Life implements ICardAbilityAction {

    name: string = '+2 life';

    Exec(): void {
        throw new Error("Method not implemented.");
    }
}

export class CardAbilityActionAdd2Cards implements ICardAbilityAction {

    name: string = '+2 cards';

    Exec(): void {
        throw new Error("Method not implemented.");
    }
}

export class CardAbilityActionAdd1Cards implements ICardAbilityAction {

    name: string = '+1 card';

    Exec(): void {
        throw new Error("Method not implemented.");
    }
}

export class CardAbilityAction2xExchange implements ICardAbilityAction {

    name: string = '2x exchange';

    Exec(): void {
        throw new Error("Method not implemented.");
    }
}

export class CardAbilityAction1xExchange implements ICardAbilityAction {

    name: string = '1x exchange';

    Exec(): void {
        throw new Error("Method not implemented.");
    }
}

export class CardAbilityAction1xDouble implements ICardAbilityAction {

    name: string = '1x double';

    Exec(): void {
        throw new Error("Method not implemented.");
    }
}

export class CardAbilityActionSort3Card implements ICardAbilityAction {

    name: string = 'sort 3 cards';

    Exec(): void {
        throw new Error("Method not implemented.");
    }
}