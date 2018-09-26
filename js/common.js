$(function() {

	$('.mfp-callback').magnificPopup({
		type: 'inline',

		fixedContentPos: false,
		fixedBgPos: true,

		overflowY: 'auto',

		closeBtnInside: true,
		preloader: false,

		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	});

	var name = $('#name');

	var phonePattern = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
	var phone = $('#phone');

	var emailPattern = /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/i;
	var email = $('#email');

	function showBtn() {
		if(name.hasClass('correct') && phone.hasClass('correct') && email.hasClass('correct'))
			$('#send').fadeIn();
	};

	function validName(){
		if(name.val() != ''){
			name.removeClass('error');
			name.addClass('correct');
			$('.valid-name').text('');
			showBtn();
		} else {
			$('.valid-name').text('Поле имя не должно быть пустым!');
			name.removeClass('correct');
			name.addClass('error');
		}
	};

	function validPhone(){
		if(phone.val() != ''){
			if(phone.val().search(phonePattern) == 0) {
				phone.removeClass('error');
				phone.addClass('correct');
				$('.valid-phone').text('');
				showBtn();
			} else {
				$('.valid-phone').text('Поле телефон введено не корректно!');
				phone.removeClass('correct');
				phone.addClass('error');
			}
		} else {
			$('.valid-phone').text('Поле телефон не должно быть пустым!');
			phone.removeClass('correct');
			phone.addClass('error');
		}
	};

	function validMail(){
		if(email.val() != ''){
			if(email.val().search(emailPattern) == 0) {
				email.removeClass('error');
				email.addClass('correct');
				$('.valid-email').text('');
				showBtn();
			} else {
				$('.valid-email').text('Поле e-mail введено не корректно!');
				email.removeClass('correct');
				email.addClass('error');
			}
		} else {
			$('.valid-email').text('Поле e-mail не должно быть пустым!');
			email.removeClass('correct');
			email.addClass('error');
		}
	};

	function clearInput(inputName) {
		inputName.val("");
		inputName.removeClass('error');
		inputName.removeClass('correct');
	}

	name.keyup(validName);

	phone.keyup(validPhone);

	email.keyup(validMail);

	$('#send').click(function(){

		var valName = name.val();
		var valPhone = phone.val();
		var valMail = email.val();

		var tbl = '<table class="table table-striped">';

		tbl += '<tr> <th scope="row">Имя: </th> <td>' + valName + '</td> </tr>';
		tbl += '<tr> <th scope="row">Телефон: </th> <td>' + valPhone + '</td> </tr>';
		tbl += '<tr> <th scope="row">E-mail: </th> <td>' + valMail + '</td> </tr>';

		tbl += "</table>";

		$(".table-total").html(tbl);

		$('.btn-open').css({"display":"none"});
		$('.btn-close').fadeIn();

		$.magnificPopup.close();
	});

	$('.btn-close').click(function(){

		clearInput(name);
		clearInput(phone);
		clearInput(email);

		$(".table-total").html("");
		$('.btn-close').css({"display":"none"});
		$('.btn-open').fadeIn();

	});

});
