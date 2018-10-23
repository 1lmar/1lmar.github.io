function Steps(steps, step, validate, rules) {

  this.maxStep = steps; //max steps length
  this.currentStep = step; //current step value
  this.validation = validate; //Validator
  this.rulesStep = rules; //step rules
  this.results = {}; //result data

}

Steps.prototype.getStep = function(step, dataTab) {

  var step = step; //next step
  var dataTab = dataTab || false; //is tab

  if(!dataTab) {
    this.getNextStep(step); //if datatab false just get next step
  } else if(this.currentStep > step){
    this.showStep(step);
    this.currentStep = step;
  } else {
    var data = this.validation.validate(this.rulesStep[this.currentStep]); //check calid step
    if(data !== false) { //if not error
      this.showStep(step);
      this.currentStep = step;
    }
  }

};

Steps.prototype.getNextStep = function(step) {

  var data = this.validation.validate(this.rulesStep[step]); //check calid step
  if(data !== false) { //if not error
    if(this.currentStep < this.maxStep) { //and not max step
      var nextStep = parseInt(step) + 1; //increase + 1
      this.showStep(nextStep, step); //show next step
      this.currentStep = nextStep; //refresh current step
      return this.results[step] = data; //set data in results and return
    } else {
      this.showCompleted();  //show completed result
      console.log(this.currentStep);
      return this.results;
    }
  }

};

Steps.prototype.showStep = function (step, prevStep) {

  $('.order-steps__item').hide().removeClass("active"); //hide active items
  $('.order-steps__tab').removeClass("current");

  $('#order-tab-' + prevStep).removeClass('disable');
  $('#order-tab-' + step).removeClass('disable');

  $('#order-steps-' + step).show().addClass("active"); //show next items
  $('#order-tab-' + step).addClass("current");

  return step;

};

Steps.prototype.showCompleted = function () { //show completed details

  $('.section-order__steps').html('<div class="order-completed"><h2>Thank you for your order!</h2>' +
  '<p>Order number is: ' + Math.floor(new Date() / 1000) + '</p>' +
  '<p>Your will recieve an email confirmation shortly to <a href="#">' + this.results[2].email + '</a></p>' +
  '<p>Estimated delivery Day is <br> <strong>' + this.getDeliveryDay() + '</strong> </p>' +
  '<p><a href="?print=Y" onclick="window.print();return false;">Print Recipe</a></p>');

  $('.section-order__sum').addClass('order-sum-completed');
  $('.header-cart__icon').addClass('cart-icon-ordered');

};

Steps.prototype.getDeliveryDay = function () { //set date type: ##/##/####
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if(dd < 10) {
    dd = '0' + dd
  }
  if(mm < 10) {
    mm = '0' + mm
  }
  return dd + '/' + mm + '/' + yyyy;
};
