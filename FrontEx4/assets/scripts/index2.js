// validation "field to be required"
var RequiredValidation = /** @class */ (function () {
    function RequiredValidation() {
        this.validationClassList = new Array();
        this.validationClassList.push('v_required');
        this.errorStr = 'field is required';
    }
    RequiredValidation.prototype.Validate = function (element, formRows) {
        if (formRows === void 0) { formRows = null; }
        return element.value !== "";
    };
    return RequiredValidation;
}());
// validation "field to contain correct email"
var EmailValidation = /** @class */ (function () {
    function EmailValidation() {
        this.validationClassList = new Array();
        this.validationClassList.push('v_email');
        this.errorStr = 'enter correct email';
    }
    EmailValidation.prototype.Validate = function (element, formRows) {
        if (formRows === void 0) { formRows = null; }
        var regex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
        return regex.test(element.value);
    };
    return EmailValidation;
}());
// validation "field to contain correct fio"
var FioValidation = /** @class */ (function () {
    function FioValidation() {
        this.validationClassList = new Array();
        this.validationClassList.push('v_fio');
        this.errorStr = 'enter correct FIO';
    }
    FioValidation.prototype.Validate = function (element, formRows) {
        if (formRows === void 0) { formRows = null; }
        var regex = new RegExp(/[A-Za-zA-ЯЁа-яё\-]+\s+[A-Za-zA-ЯЁа-яё]+$/, "gm");
        return regex.test(element.value);
    };
    return FioValidation;
}());
// validation "field to contain secured password"
var PasswordValidation = /** @class */ (function () {
    function PasswordValidation() {
        this.validationClassList = new Array();
        this.validationClassList.push('v_pwd');
        this.errorStr = 'password must contain one digit, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long';
    }
    PasswordValidation.prototype.Validate = function (element, formRows) {
        if (formRows === void 0) { formRows = null; }
        var regex = new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/, "gm");
        return regex.test(element.value);
    };
    return PasswordValidation;
}());
// validation "field to confirm password"
var PasswordConfirmatioValidation = /** @class */ (function () {
    function PasswordConfirmatioValidation() {
        this.validationClassList = new Array();
        this.validationClassList.push('v_pwd_confirm');
        this.errorStr = 'password confirmation not match';
    }
    PasswordConfirmatioValidation.prototype.Validate = function (element, formRows) {
        if (formRows === void 0) { formRows = null; }
        if (formRows !== null) {
            // find password input
            var pwd = formRows === null || formRows === void 0 ? void 0 : formRows.find(function (e) {
                if (e.inputElement !== null && e.inputElement.type.toUpperCase() === 'password'.toUpperCase() && e.inputElement !== element) {
                    return e.inputElement;
                }
            });
            if (pwd !== undefined) {
                return element.value === pwd.inputElement.value;
            }
            return false;
        }
        return false;
    };
    return PasswordConfirmatioValidation;
}());
// validation "field must benpm  checked"
var AcceptRulesValidation = /** @class */ (function () {
    function AcceptRulesValidation() {
        this.validationClassList = new Array();
        this.validationClassList.push('v_accept_rules_checked');
        this.errorStr = 'accept the rules before continue';
    }
    AcceptRulesValidation.prototype.Validate = function (element, formRows) {
        if (formRows === void 0) { formRows = null; }
        if (element.type.toUpperCase() == 'checkbox'.toUpperCase()) {
            return element.checked;
        }
        return false;
    };
    return AcceptRulesValidation;
}());
// validation dictionary
var ValidationDictionary = /** @class */ (function () {
    function ValidationDictionary() {
        this.validations = new Array();
        this.validations.push(new RequiredValidation());
        this.validations.push(new EmailValidation());
        this.validations.push(new FioValidation());
        this.validations.push(new PasswordValidation());
        this.validations.push(new PasswordConfirmatioValidation());
        this.validations.push(new AcceptRulesValidation());
    }
    return ValidationDictionary;
}());
// form row info class for easy work with row's elements
var FormRowElement = /** @class */ (function () {
    function FormRowElement(input, error) {
        this.inputElement = null;
        this.errorElement = null;
        this.inputElement = input;
        this.errorElement = error;
    }
    return FormRowElement;
}());
// main class to validate registration form
var FormValidator = /** @class */ (function () {
    function FormValidator() {
        // css selectors
        this.formSelector = '.reg-form';
        this.formSelectorErrorStr = 'reg-form not found on current page';
        this.formRowSelector = '.form-row';
        this.rowInputSelector = 'input';
        this.rowErrorSelector = '.form-row__error-text';
        this.validationDictionary = new ValidationDictionary();
        // form for validation
        this.form = {};
        // list of form rows
        this.formRows = new Array();
        var queryForm = document.querySelector(this.formSelector);
        if (queryForm === null) {
            throw new Error(this.formSelectorErrorStr);
        }
        if (queryForm instanceof HTMLFormElement) {
            this.form = queryForm;
        }
        else {
            throw new Error(this.formSelectorErrorStr);
        }
    }
    // init form validator
    FormValidator.prototype.Init = function () {
        this.FindFormRows();
        this.SetFormSubmitHandler();
    };
    // save form-rows element for future using
    FormValidator.prototype.FindFormRows = function () {
        var _this = this;
        // find all rows
        var nodes = this.form.querySelectorAll(this.formRowSelector);
        if (nodes.length === 0)
            return;
        // save input and error element in array
        nodes.forEach(function (element) {
            var input = element.querySelector(_this.rowInputSelector);
            var error = element.querySelector(_this.rowErrorSelector);
            if (input !== null && error !== null) {
                _this.formRows.push(new FormRowElement(input, error));
            }
        });
    };
    // set handler for form event OnSubmit
    FormValidator.prototype.SetFormSubmitHandler = function () {
        var _this = this;
        this.form.addEventListener('submit', function (e) {
            if (!_this.Validate()) {
                e.preventDefault();
            }
        });
    };
    // clear errors from previous validation 
    FormValidator.prototype.ClearValidationErrors = function () {
        this.formRows.forEach(function (row) {
            if (row.errorElement !== null)
                row.errorElement.textContent = "";
        });
    };
    // get all validations for element
    FormValidator.prototype.GetValidationsForRow = function (element) {
        var res = new Array();
        this.validationDictionary.validations.forEach(function (validation) {
            var contains = validation.validationClassList.filter(function (value) { return element.classList.contains(value); });
            if (contains.length > 0) {
                res.push(validation);
            }
        });
        return res;
    };
    // form validation method
    FormValidator.prototype.Validate = function () {
        var _this = this;
        this.ClearValidationErrors();
        var successFlag = true;
        this.formRows.forEach(function (row) {
            if (row.inputElement !== null) {
                var validations = _this.GetValidationsForRow(row.inputElement);
                for (var _i = 0, validations_1 = validations; _i < validations_1.length; _i++) {
                    var validation = validations_1[_i];
                    if (!validation.Validate(row.inputElement, _this.formRows)) {
                        if (row.errorElement !== null)
                            row.errorElement.textContent += '>' + validation.errorStr;
                        successFlag = false;
                    }
                }
            }
        });
        return successFlag;
    };
    return FormValidator;
}());
// entry point function
function main() {
    // script logic - main thread
    var formValidator = new FormValidator();
    formValidator.Init();
}
// entry point
main();
