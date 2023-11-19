interface IValidation {
    // list css classes for validation
    validationClassList: Array<string>;
    // error string for validation error
    errorStr: string;
    // validation method
    Validate(element: Element, formRows: Array<FormRowElement> | null): boolean;
}

// validation "field to be required"
class RequiredValidation implements IValidation {
    
    public validationClassList: Array<string>;
    
    public errorStr: string;

    constructor() {
        
        this.validationClassList = new Array<string>();
        this.validationClassList.push('v_required');

        this.errorStr = 'field is required';
    }
    
    public Validate(element: HTMLFormElement, formRows: Array<FormRowElement> | null = null): boolean {    
        return element.value !== "";
    }
}

// validation "field to contain correct email"
class EmailValidation implements IValidation {
    
    public validationClassList: Array<string>;
    
    public errorStr: string;

    constructor() {
        
        this.validationClassList = new Array<string>();
        this.validationClassList.push('v_email');

        this.errorStr = 'enter correct email';
    }
    
    public Validate(element: HTMLFormElement, formRows:  Array<FormRowElement> | null = null): boolean {    
        let regex : RegExp = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
        return regex.test(element.value);
    }
}

// validation "field to contain correct fio"
class FioValidation implements IValidation {
    
    public validationClassList: Array<string>;
    
    public errorStr: string;

    constructor() {
        
        this.validationClassList = new Array<string>();
        this.validationClassList.push('v_fio');

        this.errorStr = 'enter correct FIO';
    }
    
    public Validate(element: HTMLFormElement, formRows:  Array<FormRowElement> | null = null): boolean {    
        let regex : RegExp = new RegExp(/[A-Za-zA-ЯЁа-яё\-]+\s+[A-Za-zA-ЯЁа-яё]+$/, "gm");
        return regex.test(element.value);
    }
}

// validation "field to contain secured password"
class PasswordValidation implements IValidation {
    
    public validationClassList: Array<string>;
    
    public errorStr: string;

    constructor() {
        
        this.validationClassList = new Array<string>();
        this.validationClassList.push('v_pwd');

        this.errorStr = 'password must contain one digit, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long';
    }
    
    public Validate(element: HTMLFormElement, formRows:  Array<FormRowElement> | null = null): boolean {    
        let regex : RegExp = new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/, "gm");
        return regex.test(element.value);
    }
}

// validation "field to confirm password"
class PasswordConfirmatioValidation implements IValidation {
    
    public validationClassList: Array<string>;
    
    public errorStr: string;

    constructor() {
        
        this.validationClassList = new Array<string>();
        this.validationClassList.push('v_pwd_confirm');

        this.errorStr = 'password confirmation not match';
    }
    
    public Validate(element: HTMLFormElement, formRows:  Array<FormRowElement> | null = null): boolean {    

        if(formRows !== null){
            // find password input
            let pwd : FormRowElement | undefined  =  formRows?.find((e) => {                
                if(e.inputElement !== null && (e.inputElement as HTMLFormElement).type.toUpperCase() === 'password'.toUpperCase() && e.inputElement !== element){
                    return e.inputElement;
                }
            });

            if(pwd !== undefined){
                return element.value === (pwd.inputElement as HTMLFormElement).value;
            }

            return false;
        }

        return false;
    }
}

// validation "field must benpm  checked"
class AcceptRulesValidation implements IValidation {
    
    public validationClassList: Array<string>;
    
    public errorStr: string;

    constructor() {
        
        this.validationClassList = new Array<string>();
        this.validationClassList.push('v_accept_rules_checked');

        this.errorStr = 'accept the rules before continue';
    }
    
    public Validate(element: HTMLFormElement, formRows: Array<FormRowElement> | null = null): boolean {    
        if(element.type.toUpperCase() == 'checkbox'.toUpperCase()){
            return element.checked;
        }
        return false;
    }
}

// validation dictionary
class ValidationDictionary{

    public validations: Array<IValidation>;

    constructor() {

        this.validations = new Array<IValidation>();

        this.validations.push(new RequiredValidation());
        this.validations.push(new EmailValidation());        
        this.validations.push(new FioValidation());             
        this.validations.push(new PasswordValidation());
        this.validations.push(new PasswordConfirmatioValidation());        
        this.validations.push(new AcceptRulesValidation());           
    }
}

// form row info class for easy work with row's elements
class FormRowElement{

    public inputElement: Element | null = null;    

    public errorElement: Element | null = null;

    constructor(input: Element, error: Element){
        this.inputElement = input;
        this.errorElement = error;
    }
}

// main class to validate registration form
class FormValidator {

    // css selectors
    public readonly formSelector : string = '.reg-form';   
    public readonly formSelectorErrorStr = 'reg-form not found on current page';     
    public readonly formRowSelector : string = '.form-row';
    
    public readonly rowInputSelector : string = 'input';
    public readonly rowErrorSelector : string = '.form-row__error-text';

    private validationDictionary: ValidationDictionary = new ValidationDictionary();

    // form for validation
    private form: HTMLFormElement = {} as HTMLFormElement;
    // list of form rows
    private formRows: Array<FormRowElement> = new Array<FormRowElement>();

    constructor(){
        
        let queryForm: Element | null = document.querySelector(this.formSelector);  

        if(queryForm === null){
            throw new Error(this.formSelectorErrorStr);         
        }
        
        if(queryForm instanceof HTMLFormElement){
            this.form = queryForm;
        }else{
            throw new Error(this.formSelectorErrorStr);       
        }        
    }

    // init form validator
    public Init(): void {                    
        this.FindFormRows();        
        this.SetFormSubmitHandler();                    
    }

    // save form-rows element for future using
    private FindFormRows(): void {

        // find all rows
        let nodes: NodeListOf<Element> = this.form.querySelectorAll(this.formRowSelector);

        if(nodes.length === 0) return;

        // save input and error element in array
        nodes.forEach(
            (element) => {            
                let input: Element | null = element.querySelector(this.rowInputSelector);
                let error: Element | null = element.querySelector(this.rowErrorSelector);

                if(input !== null && error !== null){
                    this.formRows.push(new FormRowElement(input, error));
                }
            }
        );                        
    }

    // set handler for form event OnSubmit
    private SetFormSubmitHandler(): void {            
        
        this.form.addEventListener(
            'submit', 
             (e: Event) : void => {
                if (!this.Validate()) {
                    e.preventDefault();
                }
            }
        );  
    }

    // clear errors from previous validation 
    private ClearValidationErrors(): void {        

        this.formRows.forEach((row) => {
            if(row.errorElement !== null) row.errorElement.textContent = "";
        });
    }

    // get all validations for element
    private GetValidationsForRow(element: Element): Array<IValidation>{

        let res: Array<IValidation> = new Array<IValidation>();

        this.validationDictionary.validations.forEach((validation) => {

            const contains = validation.validationClassList.filter(value => element.classList.contains(value));
            if(contains.length > 0){
                res.push(validation);
            }
        });

        return res
    }

    // form validation method
    public Validate(): boolean {

        this.ClearValidationErrors();

        let successFlag: boolean = true;
        
        this.formRows.forEach((row) => {

            if(row.inputElement !== null){                
                let validations: Array<IValidation> = this.GetValidationsForRow(row.inputElement);

                for(const validation of validations){
                    if(!validation.Validate(row.inputElement, this.formRows)){                        
                        if(row.errorElement !== null) row.errorElement.textContent += '>' + validation.errorStr;
                        successFlag = false;
                    }
                }
            }    
        });

        return successFlag;
    }
}

// entry point function
function main(): void {

    // script logic - main thread

    let formValidator : FormValidator = new FormValidator();

    formValidator.Init();
}

// entry point
main();