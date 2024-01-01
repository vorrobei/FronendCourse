
export interface IRestQuiz {

    Get<T>(getURL: string): Promise<T>;
    
    Post<T>(postUrl: string, data: unknown): Promise<T>;

}

export class RestToJSONServer implements IRestQuiz {

    private _serverURL: string;

    constructor(serverURL: string){

        this._serverURL = serverURL;        

    }

    public async Get<T>(getURL: string): Promise<T> {
        
        let endPointURL : string = this._serverURL + getURL;

        return (await fetch(endPointURL)).json() as T;  // тут можно обойтись без явного  приведения типов
    }

    public async Post<T>(postUrl: string, data: unknown): Promise<T>{

        let endPointURL : string = this._serverURL + postUrl;

        return (await fetch(endPointURL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })).json() as T; // тут можно обойтись без явного  приведения типов
    }
    
}
