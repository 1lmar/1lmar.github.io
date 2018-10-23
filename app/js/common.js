$(function() {

  //-------------------------------------- Initialize start -------------------------------------//

  var form_data = {};
  var shipping_step = rules.shipping_step; //steps rules
  var billing_step = rules.billing_step;
  var payment_step = rules.payment_step;

  var validation = new Validation(); //validator.js
  var steps = new Steps( //steps.js
    3, //max steps
    1, //current step
    validation,
    {
      1: shipping_step, //steps rules
      2: billing_step,
      3: payment_step
    }
  );

  $('.next').on('click', function(event) {

    event.preventDefault();
    var step = $(this).attr('data-next'); //get current step

    steps.getStep(step);

  });

  $('.order-steps__tab').on('click', function(event) {

    event.preventDefault();
    var step = $(this).attr('data-tab'); //get current step

    steps.getStep(step, true);

  });

  $('#sameAsShipping').on('click', function(event) { //fill input same as shipping

    event.preventDefault();
    sameAsShipping(steps.results[1]);

    if(!$('#email').val()){ //focus to email input
      $('#email').focus();
    }

  });

  $('#cardNumber').keyup(function() { //check visa

    var visaCardPattern = /^4(?:\d[ -]?){15}$/;

    if(visaCardPattern.test($(this).val())) {
      $('.card-input').addClass('visa-card');
    } else {
      $('.card-input').removeClass('visa-card');
    }

  });

  $('.form-control').change(function() { //change error background
    if($(this).hasClass('invalid'))
      $(this).removeClass('invalid');
  });

  $('.selectpicker').selectpicker(); //select dropdown with search (plugin: slectpicker)

  //-------------------------------------- Initialize end -------------------------------------//


});
