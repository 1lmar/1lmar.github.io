$(function() {

  //-------------------------------------- Initialize start -------------------------------------//

  var form_data = {};
  var shipping_step = rules.shipping_step;
  var billing_step = rules.billing_step;
  var payment_step = rules.payment_step;

  var validation = new Validation();

  $('.next').on('click', function(event) {

    event.preventDefault();
    var step = $(this).attr('data-next'); //get current step

    if(step == 1) {
      var shipping_data = validation.validate(shipping_step);
      if(shipping_data !== false) {
        form_data.shipping_step = shipping_data;
        nextStep(step);
      }
    } else if(step == 2) {
      var billing_data = validation.validate(billing_step);
      if(billing_data !== false) {
        form_data.billing_step = billing_data;
        nextStep(step);
      }
    } else if(step == 3) {
      var payment_data = validation.validate(payment_step);
      if(payment_data !== false) {
        form_data.payment_step = payment_data;
        showCompleted();

        return form_data; //send form data
      }
    } else{
      return false;
    }

  });

  $('#sameAsShipping').on('click', function(event) { //fill input same as shipping

    event.preventDefault();
    sameAsShipping(form_data.shipping_step);

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

  //-------------------------------------- helpers start -------------------------------------//

  function getDeliveryDay() { //set date type: ##/##/####

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

    return mm + '/' + dd + '/' + yyyy;

  }

  function nextStep(step) { //next step tabs

    $('.order-steps__item').hide().removeClass("active"); //hide active items
    $('.order-steps__tab').removeClass("current");

    step++;

    $('#order-steps-' + step).show().addClass("active"); //show next items
    $('#order-tab-' + step).addClass("current");

    return step;

  }

  function showCompleted() { //show completed details

    $('.section-order__steps').html('<div class="order-completed"><h2>Thank you for your order!</h2>' +
    '<p>Order number is: ' + Math.floor(new Date() / 1000) + '</p>' +
    '<p>Your will recieve an email confirmation shortly to <a href="#">' + $('#email').val() + '</a></p>' +
    '<p>Estimated delivery Day is <br> <strong>' + getDeliveryDay() + '</strong> </p>' +
    '<p><a href="?print=Y" onclick="window.print();return false;">Print Recipe</a></p>');

    $('.section-order__sum').addClass('order-sum-completed');
    $('.header-cart__icon').addClass('cart-icon-ordered');

  }

  //-------------------------------------- helpers end -------------------------------------//

});
