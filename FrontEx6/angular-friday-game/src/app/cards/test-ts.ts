export interface IParent {
    
    id: number;
}

export interface IChild extends IParent {

    name: string;

}

export class Child implements IChild {
        
    id: number = 0;
    name: string = 'parent';

    constructor (id: number){
        this.id = id;
        this.name = 'child' + this.id.toString();76
    }
}

const _childs: Array<IParent> = [new Child(1), new Child(2), new Child(3)]

export class ChildList<T>{
    
    public childs: Array<T> = _childs as Array<T>;

    public Test(): void {
        (this.childs[0] as IParent).id;
    }

}