$(function() {

	var a, b, total = 0;

	var ruleWidth = 20; //размерность линейки
	var minWidth = 1; //Минимальное число
	var maxWidth = 19; //Максимальное число

	var lineWidth = 39; //Ширина 1см = 39px
	var calcFirst = $("#calcFirst"); //Первая цифра
	var calcSec = $("#calcSec"); //Вторая цифра
	var firstLine = $(".line-first"); //Первая линия
	var secLine = $(".line-sec"); //вторая линия

	function drawLine(num, item){ //Функция рисующая линию
		return item.css('width', (num * lineWidth) + 'px');
	}

	function drawSecLine() { //Функция чертит вторую линию
		drawLine(b, secLine); //чертим линию
		$('#secNum').fadeIn(); //Показываем инпут
	}

	function totalCalc() { //функция выводящая инпут ответа
		$("#totalCalc").fadeIn(); //показываем инпут
		$(".calc-sum-total").css("display", "none"); //Убираем знак ?
	}

	function getRandomNum() { //Получить случайное число
		return Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
	}




	//Начало выполнения программы

	a = getRandomNum(); //генерируем число a
	b = getRandomNum(); //генерируем число b

	total = a + b; //Суммируем числа

	if(total >= ruleWidth){
		while(total >= ruleWidth) {
			a = getRandomNum(); //генерируем число a
			b = getRandomNum(); //генерируем число b
			total = a + b;
		}
	}

	calcFirst.text(a); //Вывод первого числа
	calcSec.text(b); //Вывод второго числа
	
	drawLine(a, firstLine); //Рисуем первую линию

	$('#firstNum').on('keyup', function() { //Проверка первого числа
		if(this.value != a){
			$(this).css("color", "red");
			$(calcFirst).css("background-color", "orange");
		} else{
			$(this).css("display", "none");
			$("#firstNumSpan").text(this.value);
			$(calcFirst).css("background-color", "transparent");

			//Рисуем вторую линию
			drawSecLine();
		}
	});

	$('#secNum').on('keyup', function() { //Проверка второго числа
		if(this.value != b){
			$(this).css("color", "red");
			$(calcSec).css("background-color", "orange");
		} else{
			$(this).css("display", "none");
			$("#secNumSpan").text(this.value);
			$(calcSec).css("background-color", "transparent");

			//Вводим ответ
			totalCalc();
		}
	});

	$("#totalCalc").on('keyup', function() {
		if(this.value != total){
			$(this).css("color", "red");
		} else{
			$(this).css("display", "none");
			$(".calc-sum-total").fadeIn().text(this.value);

			$(".succes").text("Отлично!");
		}
	});


});
