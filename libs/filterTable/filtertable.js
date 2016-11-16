function sortHistory(){
	var sortHistory = $('#sort-history').val();

	if(sortHistory == "Все"){
		$('tr[name="Пополнить"]').show();
		$('tr[name="Вывод"]').show();
	} else if(sortHistory == "Пополнить"){
		$('tr[name="Пополнить"]').show();
		$('tr[name="Вывод"]').hide();
	} else if(sortHistory == "Вывод"){
		$('tr[name="Вывод"]').show();
		$('tr[name="Пополнить"]').hide();
	}
}