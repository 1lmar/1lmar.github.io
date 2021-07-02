const doctorItem = {
	onClickHandler: (btn) => {
		if ($(btn).hasClass('active')) return doctorItem.hide(btn);

		return doctorItem.show(btn);
	},
	hide: (btn) => {
		$(btn).text('Показать расписание');
		$(btn)
				.closest('.Doctors__item')
				.find('.date_table')
				.slideUp('ease')
		$(btn)
				.closest('.Doctors__item')
				.find('.date_table_mobile')
				.slideUp('ease')

		$(btn)
				.closest('.Doctors__item')
				.find('.not_found')
				.slideUp('ease')
		$(btn).removeClass('active')

		return false;
	},
	show: async (btn) => {
		$(btn).addClass('active').text('Скрыть расписание');

		loading(true);
		let data = await api.getDoctor(Object.keys(API.doctors))

		if (!data.length > 0) {
			doctorItem.showEmptyList(btn);

			return loading(false);
		}

		data = data.sort(function (a, b) {
        return a.data.length > b.data.length
    });

    let d = doctorItem.generatePartsOfDayList(data);

    data.map(({data, date}) => {
    	let adr_template = ``
	    let adr_template_mobile = ``
	    let l = 0;
	    for (let adr in API.branches) {
	        if (Object.keys(d).includes(API.branches[adr].id)) {
	            l++;
	            adr_template += `<div class='adr_item' data-id='${API.branches[adr].id}'>${API.branches[adr].address}</div>`
	            adr_template_mobile += `<option data-id='${API.branches[adr].id}' value='${API.branches[adr].id}'>${API.branches[adr].address}</option>`
	        }
	    }

	    if (l > 1) {
	        adr_template = `<div class='adr_item' data-id='all'>Все</div>` + adr_template
	        adr_template_mobile = `<option data-id='all' value='all'>Все</option>` + adr_template_mobile
	    }

	    $(btn)
	        .closest('.Doctors__item')
	        .find('.adr_container')
	        .html('')
	        .append(adr_template)

	    $(btn)
	        .closest('.Doctors__item')
	        .find('.adr_container_moblie')
	        .html("<select>" + adr_template_mobile + "</select>")

	    $(btn)
	        .closest('.Doctors__item')
	        .find('.adr_item')
	        .first()
	        .addClass('active')
    });

		loading(false)
	},
	generatePartsOfDayList: (data) => {
		if (!data) return {};

		let d = {}

		data.map(({data, date}) => {
  		data.map((day, day_index) => {
				API
				.branches
				.forEach(branch => {

				    let d1 = [],
				        d2 = [],
				        d3 = []

				    let allowedBranch = false
				    day
				        .data
				        .map(time => {
				            if (time.branchid == branch.id) {
				                allowedBranch = true;
				                let hours = moment(time.start).hours(),
				                    mins = moment(time.start).minutes()

				                if (hours <= 11) {
				                    d1.push(time)
				                } else if (hours <= 14 && mins <= 30) {
				                    d2.push(time)
				                } else {
				                    d3.push(time)
				                }
				            }
				        })
				    if (allowedBranch) {
				        if (!d[branch.id]) 
				            d[branch.id] = []
				        if (d[branch.id][day_index] != undefined) {
				            d[branch.id][day_index] = {
				                d1: [
				                    ...d[branch.id][day_index].d1,
				                    ...d1
				                ].filter((v, i, a) => a.findIndex(t => (t.start === v.start)) === i),
				                d2: [
				                    ...d[branch.id][day_index].d2,
				                    ...d2
				                ].filter((v, i, a) => a.findIndex(t => (t.start === v.start)) === i),
				                d3: [
				                    ...d[branch.id][day_index].d3,
				                    ...d3
				                ].filter((v, i, a) => a.findIndex(t => (t.start === v.start)) === i)
				            }
				        } else {
				            d[branch.id].push({d1, d2, d3})
				        }
				    }

				})
  		})
  	})

  	return d;
	},
	showEmptyList: (btn) => {
		$(btn)
      .addClass('active')
      .text('Скрыть расписание');
    $('html, body')
      .stop()
      .animate({ scrollTop: $(btn).offset().top }, 1000);
    $(btn)
      .closest('.Doctors__item')
      .append(`<div class="not_found">Извините, по выбранным параметрам талоны не найдены, обратитесь в регистратуру по телефону ${reg_phone}</div>`)
	}

};