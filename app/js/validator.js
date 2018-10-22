function Validation() {}

Validation.prototype.validate = function(rules) {

  $('.form-control').removeClass('invalid').tooltip('dispose'); //del all errors of inputs with class .form-control

  delete this.errorsList; //del error list
  this.fields = {}; //clear links of inputs
  this.data = {}; //add/clear data

  for (field in rules) { //for each rules
    var rulesString = rules[field]; //get rule str

    this.fields[field] = $('#' + field); //get link to field
    this.data[field] = this.fields[field].val(); //get a value of the field

    this.validateField(field, this.data[field], rulesString); //check field
  }

  if(this.errorsList == null) { //if error list emty
    console.log(this.data);
    return this.data; //return data
  } else {
    this.showErrors(); //call method for show errors
    return false; // and return false
  }

};

Validation.prototype.showErrors = function() {

  var focusSet = false; //mark. The field haven`t set yet
  var errorlist = this.errorsList; //get error list

  for(field in errorlist) {

    var error = errorlist[field]; //get error for field
    var message = this.lang(error); //get error message
    //show invalid input and tooltip
    this.fields[field].addClass("invalid").attr('title', message).tooltip();
    //put the focus in the first invalid field
    if(!focusSet) {
      this.fields[field].focus();
      focusSet = true;
    }

  }

  return true;

};

Validation.prototype.lang = function(error) { return lang.errors[error]; }; //return error message

Validation.prototype.numeric = function(num) { return /^\d+$/.test(num);  }; //check is number

Validation.prototype.name_field = function(str) { return /^[a-z ,.'-]+$/i.test(str);  }; //check Full Name

Validation.prototype.valid_email = function(str) { return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(str);  }; //check email

Validation.prototype.valid_phone = function(str) { return /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(str);  }; //check phone

Validation.prototype.valid_card = function(str) { return /^(?:\d[ -]?){16}$/.test(str);  }; //check card

Validation.prototype.expire_date = function(str) { return /^\d{2}\/\d{2}$/.test(str);  }; //check expire date

Validation.prototype.required = function(str) { return !(str == "" || str == null)  }; //check isn't empty

Validation.prototype.trim = function(str) {  return str.replace(/^\s+|\s+$/g, '');  }; //clear spaces

Validation.prototype.parseRules = function(rules) { return rules.split('|');  }; //convert the str of rules to array

Validation.prototype.validateField = function(field, str, rules) {

  var rules = this.parseRules(rules); //convert the str of rules to array

  for(var i = 0; i < rules.length; i++){ //research all the rules
    var rule = rules[i]; //get rule

    var result = this[rule](str); //callback for process or check

    //if the result is something other than false or true
    //then it's a process, else it`s a check
    if(result !== true && result !== false) {

      str = this.data[field] = result; //rewrite the result

    } else if(result === false) {
        this.setError(field, rule); //catch the error
        break;
    }

  }

  return true;

};

Validation.prototype.setError = function(field, rule) {

  if(this.errorsList === undefined) {
    this.errorsList = {}; //create an object of errors, if isn't
  }

  return this.errorsList[field] = rule; //return and set new error of field

};

var lang = { //error messages
  errors: {
    name_field: 'Please enter the correct name! Example: Jonathan Smith.',
    numeric: 'Please enter only numbers.',
    valid_email: 'Please enter the correct Email! Example: j.smith@gmail.com.',
    valid_phone: 'Please enter the correct phone! Example: +7 (987) 123-77-88.',
    valid_card: 'Please enter the correct Card! Example: 4012 8888 8888 1881',
    expire_date: 'Please enter the correct expire date! Example: 05/18',
    required: 'Please enter the field.'
  }
};

var rules = { //set rules for validation
  shipping_step: {
    fullName: 'trim|required|name_field',
    daytimePhone: 'trim|required|numeric|valid_phone',
    building: 'trim',
    streetAddress: 'trim|required',
    city: 'trim|required',
    country: 'required',
    zip: 'trim|required|numeric'
  },
  billing_step: {
    billFullName: 'trim|required|name_field',
    email: 'trim|required|valid_email',
    billBuilding: 'trim',
    billStreetAddress: 'trim|required',
    billCity: 'trim|required',
    billCountry: 'required',
    billZip: 'trim|required|numeric'
  },
  payment_step: {
    cardholderName: 'trim|required|name_field',
    cardNumber: 'trim|required|valid_card',
    expireDate: 'trim|required|expire_date',
    securityCode: 'trim|required',
  }
};
