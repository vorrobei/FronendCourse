import { IRestQuiz, RestToJSONServer } from "./rest";
import { IQuiz, IQuizFactory, QuizFactory, QuizQuestion, QuizAnswer, QuizAnswerResult } from "./quiz";

class QuizFormController {

    private readonly formSelector = '.quiz-form';
    private readonly questionTextContainerSelector = '.quiz-form__question-text';
    private readonly questionControlsContainerSelector = '.question-controls';
    private readonly nextButtonSelector = '.quiz-controls__button-next';
    private readonly formScoresSelector = '.quiz-result';    
    private readonly formScoresTextSelector = '.score-container__text';    
    private readonly playAgainButtonSelector = '.quiz-controls__button-play-again';    

    private _quiz: IQuiz;
    private _form: HTMLFormElement | null = null;
    private _questionContainer: HTMLFormElement | null = null;
    private _answersContainer: HTMLElement | null = null;
    private _nextButton: HTMLFormElement | null = null;
    private _formScores: HTMLFormElement | null = null;
    private _formScoresText: HTMLElement | null = null;
    private _playAgainButton: HTMLFormElement | null = null;

    constructor(quiz: IQuiz){
                
        this._quiz = quiz;

        // get forms
        this._form = document.querySelector(this.formSelector);  
        this._formScores = document.querySelector(this.formScoresSelector);          

        // get and setup quiz form's elements
        if(this._form !== null){
            this._questionContainer = this._form.querySelector(this.questionTextContainerSelector)
            this._answersContainer = this._form.querySelector(this.questionControlsContainerSelector);
            this._nextButton = this._form.querySelector(this.nextButtonSelector);
            
            this._nextButton?.addEventListener('click', (e): void => {

                if(this._form === null || this._formScores === null) return;

                let nextQuestion = this._quiz.GetNextQuestion();

                if(nextQuestion !== null){
                    this.ShowQuestion(nextQuestion);

                    this._form.style.display = "flex";                        
                    this._formScores.style.display = "none";
                }else{                         
                    if(this._formScoresText !== null && this._formScoresText !== undefined){
                        this._formScoresText.innerHTML = "Your scored " + this._quiz.GetScores() + " out of " + this._quiz.questionIDs.length;
                    }                                        

                    this._form.style.display = "none";                        
                    this._formScores.style.display = "flex";                    
                }
            })            
        }

        // get and setup result form's elements
        if(this._formScores !== null){        

            this._formScoresText = this._formScores?.querySelector(this.formScoresTextSelector);

            this._playAgainButton = this._formScores.querySelector(this.playAgainButtonSelector);            
            
            this._playAgainButton?.addEventListener('click', (e): void => {
                this.StartQuiz();
            })                        
        }
    }

    // reset quiz to start
    public StartQuiz(){

        this._quiz.StartQuiz();             
        this._nextButton?.click();        
    }

    // show question and result on form
    public ShowQuestion(question: QuizQuestion | null): void {
        
        if(question === null || this._questionContainer === null) return;        

        // delete buttons
        this.ClearQuestion();           
        // bind buttons and answers        
        this.CreateQuestion(question);
    }

    // setup new question text and create buttons for answers
    private CreateQuestion(question: QuizQuestion): HTMLElement {
        
        let q = document.createElement('span');
        q.classList.add('question-text__text')
        q.innerHTML = question.text;

        this._questionContainer?.appendChild(q);

        question.answers.forEach((answer: QuizAnswer) => {

            let button: HTMLElement = this.CreateAnswerButton(question, answer);
            this._answersContainer?.appendChild(button);

        });        

        return q;
    }

    // create new button and bind it to answer
    private CreateAnswerButton(question: QuizQuestion, answer: QuizAnswer): HTMLElement {

        let button = document.createElement('button');
        button.type = 'button';
        button.classList.add('question-controls__button');                    
        button.id = answer.id.toString();        
        button.innerHTML = answer.answer.replace(/</g, '&lt').replace(/>/g, '&gt');        
        
        button.addEventListener('click', (e) => {     
            this.ShowAnswerResult(question, answer);            
        });

        return button;
    }

    // show answers status
    private async ShowAnswerResult(question: QuizQuestion, answer: QuizAnswer): Promise<void>{

        if(this._answersContainer === null) return;

        let answerResult: QuizAnswerResult = await this._quiz.CheckAnswer(question, answer);

        this._answersContainer.childNodes.forEach((node: ChildNode) => {            
            
            // disable all buttons after recieve answer
            let button: HTMLButtonElement = (node as HTMLButtonElement);
            button.disabled = true;            
            
            if(button.id === answer.id.toString() && answer.id !== answerResult.correctID){
                button.classList.add('question-controls__button_red');          
            }

            if(button.id === answerResult.correctID.toString()){
                button.classList.add('question-controls__button_green');          
            }        
        })
    }

    // delete all form's component for current question
    private ClearQuestion(){

        if(this._questionContainer === null || this._questionContainer.lastChild === null || 
                this._answersContainer === null || this._answersContainer.lastChild === null) return;        

        while(this._questionContainer.firstChild){
            this._questionContainer.removeChild(this._questionContainer.lastChild);
        }

        while (this._answersContainer.firstChild) {
            this._answersContainer.removeChild(this._answersContainer.lastChild);            
        }        
    } 

}

// entry point
async function main(){

    const serverURL = "http://localhost:3034";
    const quizIDs: Array<number> = [1,2];

    let quizID: number = Math.floor((Math.random() * quizIDs.length) + 1);

    let rest: IRestQuiz = new RestToJSONServer(serverURL);

    let quizFactory: IQuizFactory = new QuizFactory(rest);

    let quiz: IQuiz = await quizFactory.GetQuiz(quizID);        

    let formController: QuizFormController = new QuizFormController(quiz);    
    
    formController.StartQuiz();
}

// entry point
main();