"use strict";

let validation_dictionary = {

    v1: {
        item_list: ['v_required'],
        validate: function(element, elements = null) {            
            return element.value != "";
        },
        error_str: 'field required',
    },

    v2: {
        item_list: ['v_email'],
        validate: function(element, elements = null) {
            const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
            return emailRegex.test(element.value);
        },
        error_str: 'enter correct email',
    },

    v3: {
        item_list: ['v_fio'],
        validate: function(element, elements = null) {
            const fioRegex = new RegExp(/[A-Za-zA-ЯЁа-яё\-]+\s+[A-Za-zA-ЯЁа-яё]+$/, "gm");
            return fioRegex.test(element.value);
        },
        error_str: 'enter correct FIO',
    },
    
    v4: {
        item_list: ['v_pwd'],
        validate: function(element, elements = null) {
            const pwdRegex = new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/, "gm");
            return pwdRegex.test(element.value);
        },
        error_str: 'password must contain one digit, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long',
    },

    v5: {
        item_list: ['v_pwd_confirm'],
        validate: function(element, elements = null) {
            for(const [key, value] of Object.entries(elements)){
                if(value.type == 'password' && value != element){
                    return value.value == element.value;
                }
            }
            return false;
        },
        error_str: 'validation pwd confirm',
    },

    v6: {
        item_list: ['v_accept_rules_checked'],
        validate: function(element, elements = null) {
            if(element.type == 'checkbox'){
                return element.checked;
            }
            return false;
        },
        error_str: 'accept the rules before continue',
    }       

};

function get_form_row_for_element(element){

    let curr_element = element;

    do{        
        curr_element = curr_element.parentElement;        
    }
    while(!curr_element.classList.contains('reg-form__row') && !curr_element.classList.contains('reg-form__row-inline') && curr_element.nodeName != 'FORM');

    return curr_element;
}

function clear_validations_text(){    

    Array.from(document.forms[0].elements).forEach(
        (e) => {  
            let error_element = get_form_row_for_element(e);
            error_element.setAttribute('error-text', "");
        }
    )
}

function get_validations_for_element(element){
    
    let res = [];

    if(element.nodeName == 'INPUT'){

        for (const [key, value] of Object.entries(validation_dictionary)) {

            for(const val of value.item_list){

                if(element.classList.contains(val)){
                    res.push(value);
                    break;
                }
            }
        }

        if(res.length > 0){
            return res;
        }
    }

    return null;
}

function set_validation_error_for_element(element, error_text){

    let error_element = get_form_row_for_element(element);
    let current_error = "" + error_element.getAttribute('error-text');

    error_element.setAttribute('error-text', current_error + " > " + error_text);   

    return 0;
}

function validate(){

    clear_validations_text();

    let success_flag = true;

    Array.from(document.forms[0].elements).forEach(
        (e) => {             
                
            let validations = get_validations_for_element(e);
                
            if(validations){            
                
                for(const v of validations){

                    if(!v.validate(e, document.forms[0].elements)){
                        set_validation_error_for_element(e, v.error_str);
                        success_flag = false;
                    }
                }                      
            }            
        }                     
    )

    return success_flag;
}

function init(){

    let form_registration = document.querySelector(".reg-form");

    form_registration.addEventListener(
        'submit', 
        function (e) {
            if(!validate()){
                e.preventDefault();
            }
        }
    );

}

function main(){

    init();  

    return 0;
}

main();
