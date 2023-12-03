import { IRestQuiz } from "./rest";

// dto class for quiz answer's result
export class QuizAnswerResult {
    
    public isCorrect: boolean = false ;

    public correctID: number = -1;
}

// dto class for quiz answers
export class QuizAnswer {
    
    public id: number = 0;
    
    public answer: string = "";    
}

// dto class for quiz questions
export class QuizQuestion{
    
    public id: number = 0;
    
    public text: string = "";
    
    public answers: Array<QuizAnswer> = new Array<QuizAnswer>();

}

export interface IQuiz {

    quizID: number;

    title: string;

    author: string;

    questionIDs: Array<number>;

    StartQuiz(): boolean;

    GetNextQuestion(): QuizQuestion | null;        

    CheckAnswer(question: QuizQuestion, answer: QuizAnswer): Promise<QuizAnswerResult>;

    GetScores(): number;
}

export class Quiz implements IQuiz
{
    private _rest: IRestQuiz;

    public quizID: number = 0;

    public title: string = "";

    public author: string = "";

    public questionIDs: Array<number> =  Array<number>();    

    public questions: Array<QuizQuestion> = new Array<QuizQuestion>();  

    private questionsWithCorrectAnswers: Array<number> = new Array<number>();

    private _currentID: number;

    constructor(rest: IRestQuiz){

        this._rest = rest;

        this._currentID = -1;
    }

    public StartQuiz(): boolean {

        this._currentID = -1;

        this.questionsWithCorrectAnswers = [];

        return true;
    }        

    public GetNextQuestion(): QuizQuestion | null {            

        if(this._currentID < this.questionIDs.length - 1){

            this._currentID++;

            return this.questions[this._currentID];;
        }

        return null;
    }  

    public async CheckAnswer(question: QuizQuestion, answer: QuizAnswer): Promise<QuizAnswerResult> {

        let res: QuizAnswerResult = await this._rest.Post<QuizAnswerResult>("/check_answer/", {"questionID": question.id, "answerID": answer.id});

        if(res.isCorrect){
            this.questionsWithCorrectAnswers.push(question.id);
        }

        return res;
    }

    public GetScores(): number {
        return this.questionsWithCorrectAnswers.length;
    }
       
}

export interface IQuizFactory {

    GetQuizList(): Promise<Array<IQuiz>>;
    
    GetQuiz(quizID: number) : Promise<IQuiz>;
}

export class QuizFactory implements IQuizFactory {
    
    private _rest: IRestQuiz;
    
    constructor(rest: IRestQuiz){

        this._rest = rest;        
    }

    public async GetQuizList(): Promise<Array<IQuiz>> {
        
        let responce: Array<IQuiz> = await this._rest.Get<Array<IQuiz>>('/quiz/');                    

        return responce;        
    }

    public async GetQuiz(quizID: number): Promise<IQuiz> {
        
        let quizData: IQuiz = await this._rest.Get<IQuiz>('/quiz/' + quizID.toString() + '/');                       

        let quiz = Object.assign(new Quiz(this._rest), quizData);

        quiz.questions = await this.GetQuizQuestions(quiz.questionIDs);        
        
        return quiz;        
    }

    public async GetQuizQuestions(questionsIDs: Array<number>): Promise<Array<QuizQuestion>>{
        
        let questionsFilter: string = "?";

        for(let qID of questionsIDs){            
            questionsFilter += "id=" + qID.toString() + "&";
        }

        let responce: Array<QuizQuestion> = await this._rest.Get<Array<QuizQuestion>>('/questions' + questionsFilter);                           
        
        return responce;
    }
}

