$(function() {

	var startTimeSec = "00";
	var startTimeMin = "01";
	var nickName = "";
	var score = 100;

	//timeSecMin
	$(".right-top .time").html("<span class='minutes'>"+ startTimeMin +"</span>:<span class='seconds'>"+ startTimeSec +"</span>");
	function addScore(aScore){
		if(aScore != 100){score += aScore;}
		return $(".game-field_right .score").html(score);
	}
	addScore(score);

	$("#start-btn").click(function() {
		var nick = $(".nick-name").val();
		if(nick){
			nickName = nick;
			$('body').addClass('start-playing');
			$(".game-field_right .name").html(nickName);
		}else{
			alert("Введите имя!");
		}
	});

	$(".game-field td").click(function(){

		var position = $(this).attr("data-position");

		if(position==undefined){position=1}

		if(position==1){
			$(this).css("transform", "rotate(90deg)");
			position++;
			$(this).attr("data-position",position);
		}else if (position==2) {
			$(this).css("transform", "rotate(180deg)");
			position++;
			$(this).attr("data-position",position);
		}else if (position==3) {
			$(this).css("transform", "rotate(270deg)");
			position++;
			$(this).attr("data-position",position);
		}else if (position==4) {
			$(this).css("transform", "rotate(360deg)");
			position++;
			$(this).attr("data-position",position);
		}else {
			addScore(-10);
			$(this).css("transform", "rotate(0deg)");
			position = 1;
			$(this).attr("data-position",position);
		}


	});

	function Timer(callback, delay) {
	    var timerId, remaining = delay;

	    this.pause = function() {
	      window.clearTimeout(timerId);
	    };

	    this.resume = function() {
	      timerId = window.setTimeout(callback, remaining);
	    };

	}

	var timeSec = $('.seconds');
	var timeMin = $('.minutes');

	var timer = new Timer(function() {
		var newTime = timeSec.text();
		var newTimeMin = timeMin.text();
		if(newTime > 0){

			newTime -= 1;
			timeSec.text(beforeNull(newTime));
			timer.resume();

		}else if(newTimeMin>0){

			newTime = 9;
			timeMin.text(beforeNull(newTimeMin-1));
			timeSec.text(beforeNull(newTime));
			timer.resume();

		}else {
			$('body').addClass('game-end');
			$('body').addClass('lose');

			var totalTime = newTime + ":" + newTimeMin;
			var total = $(".game-field_right .score").html();
			var name = nickName;
			congratulation(name,(+total),totalTime);
		}
	}, 1000);

	timer.resume();

	$(".pause").click(function() {
		if($('body').hasClass('paused')){
			$('body').removeClass('paused');
			timer.resume();
		}else{
			timer.pause();
			$('body').addClass('paused');
		}
	});
	$(document).keyup(function(e){
		if (e.which == 32) {
			if($('body').hasClass('paused')){
				$('body').removeClass('paused');
				timer.resume();
			}else{
				timer.pause();
				$('body').addClass('paused');
			}
		}
	});

	//клавиша пробел
	function beforeNull(num){
		if(num <= 9){
			return "0" + num;
		}
		return num;
	}

	function congratulation(name,total,time) {
		$('.congratulation .name').html(name);
		$('.congratulation .total').html(total);
		$('.congratulation .time').html(time);

		$('.congratulation #name').val(name);
		$('.congratulation #total').val(total);
		$('.congratulation #time').val(time);
	}

	function getResult() {
		$.ajax({
      type: 'POST',
      url: 'reg.php',
      data: msg,
      success: function() {
        return showResult();
      },
      error:  function(xhr, str){
  			alert('Возникла ошибка: ' + xhr.responseCode);
      }
    });
	}
	function showResult() {
		$(".main-content").html("");
		$(".main-content").load("result.php");
	}

	

});
