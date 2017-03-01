$(function() {

	$('.head__shirt-slider').owlCarousel({
		items: 1,
	});
	$('.s__description-shirt--img').owlCarousel({
		items: 1,
		nav: true,
		navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>']
	});
	// $('.form__order-slider').owlCarousel({
	// 	items: 1,
	// 	nav: true,
	// 	navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>']
	// });

	$('.button-order,.add-shirt-btn').magnificPopup({
		type: 'inline',
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	});

	var q = $('input.value');
	q.val(1);

	$(".form__order-desc--count .inc").on('click',function(){
		q.val( parseInt(q.val())+1 );
	});

	$(".form__order-desc--count .dec").on('click',function(){
		if(q.val()>1){
			q.val( parseInt(q.val())-1 );
		}
	});

});
