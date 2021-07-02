const api_url = 'http://91.203.194.44:9055/api/v1/',
    token = '98NBD76V43DMN5675',
    api_endpoints = {
        options: 'options.get.v1',
        specialty: "cab_specializations.get.v1",
        doctor_by_specialty: "cab_employees_by_specialization.get.v1",
        get_doctor_shedule: 'cab_employees_timetable.get.v1',
        validate_phone: 'validate_phone_by_sms.v1',
        gender_age: 'cab_specializations_by_gender_and_age.get.v1',
        branches: 'branches_requisites.get.v1',
        appointment_create: 'appointment_create.v1'
    };

const api_axios = axios.create();

/*api_axios.interceptors.response.use((response) => response, (error) => {
    return (() => {
        $('body').notify(error, "error");
    })
});*/

function dateFromToday(n) {
    return moment()
        .add(n, 'day')
        .format('DD-MM-YYYY')
}

let API = {}

const api = {
    getOptions: async function() {
        let {data} = await api_axios.post(api_url + api_endpoints.options, { token })
        data = JSON.parse(data).data
        window.localStorage.setItem('doctor_period', data.doctor_period)
        window.localStorage.setItem('verify_sms', data.verify_sms)
        window.localStorage.setItem('hide_sex_and_age', data.hide_sex_and_age)
    },
    getSpecialty: async function () {
        let { data } = await api_axios.post(api_url + api_endpoints.specialty, { token })
        return data;
    },
    getSpecialtyFilter: async function (gender, age = -1) {
        let { data } = await api_axios.post(api_url + api_endpoints.gender_age, { token, gender, age })
        return data;
    },
    getDoctors: async function (specializationid) {
        let { data } = await api_axios.post(api_url + api_endpoints.doctor_by_specialty, { token, specializationid })
        API.doctors = {};
        API.specializationid = specializationid;
        data.map(item => {API.doctors[item.employeeid] = item} );
        return data;
    },
    getDoctor: async function (doctorId) {
        let { data } = await api_axios.post(api_url + api_endpoints.get_doctor_shedule, {
            token,
            date_from: dateFromToday(0),
            date_to: dateFromToday(window.localStorage.getItem('doctor_period')),
            employee_ids: doctorId
        })
        data = data.map(item => {
            return ({
                data:item.data.sort((a,b) => {
                    return moment(a.date).isAfter(b.date)
                }),
                employeeid: item.employeeid
            })
        })
        return data;
    },
    getBranches: async function () {
        let { data } = await api_axios.post(api_url + api_endpoints.branches, {
            token
        })
        API.branches = data;
    },
    sendForm: async function ({
        phone_number,
        patient_birthday,
        patient_lastname,
        patient_firstname,
        patient_middlename,
        patient_email,
        comment,
        employeeid,
        code
    }) {
        window.localStorage.setItem('ticket', JSON.stringify({
            token,
            phone_number,
            patient_birthday,
            patient_lastname,
            patient_firstname,
            patient_middlename,
            patient_email,
            comment,
            employeeid
        }))
        if(window.localStorage.getItem('verify_sms') == 'true') {
            let data = await api_axios.post(api_url + api_endpoints.validate_phone, {
                token,
                phone_number,
                patient_birthday,
                patient_lastname,
                patient_firstname,
                patient_middlename,
                patient_email,
                comment,
                employeeid,
                code
            })
            return data.data;
        } else {
            return;
        }
    },
    create: function() {
        return api_axios.post(api_url + api_endpoints.appointment_create, {
            ...JSON.parse(window.localStorage.getItem('ticket')),
            ...API.appointment
        })
    }
}
$(function () {
    window.localStorage.clear();
    ui.step(1);
    api.getOptions().then(function() {
        loading(true)
        ui.drawSpecialty();
    })

    api.getBranches();

    $(document).on('click', '.Doctors__item .all-doctors', e => doctorItem.onClickHandler($(e.currentTarget)));

    $('input[name="patient_birthday"]').mask('00.00.0000');
    $('input[type="phone"]').mask('+70000000000');
    $('.Doctors__popup .btn').click(function () {
        $('html, body').stop().animate({
            scrollTop: 0
          },1000)
        $('.Doctors__popup').removeClass('active');
        ui.step(4);
    })
    $('.close_p').click(function () {
        $('.Doctors__popup,.p1,.p2,.popup,.p3').removeClass('active');
    })

    $('.age select').change(async function () {
        ui.drawSpecialty(await api.getSpecialtyFilter($('.gender__item.active').data('gender') || 0, $('.age select').val()));
    })

    $('.gender__item').click(async function() {
        $('.gender__item').removeClass('active');
        $(this).addClass('active')
        ui.drawSpecialty(await api.getSpecialtyFilter($(this).data('gender'), $('.age select').val()));
    })
    window.localStorage.setItem('sent', false)
    $('.Doctors__form form').submit(async function (e) {
        e.preventDefault();
        if(window.localStorage.getItem('sent') == 'false') {
        loading(true)
        
        await api.sendForm({
            phone_number: $(this).find('input[name="phone_number"]').val(),
            patient_birthday: $(this).find('input[name="patient_birthday"]').val(),
            patient_lastname: $(this).find('input[name="patient_lastname"]').val(),
            patient_firstname: $(this).find('input[name="patient_firstname"]').val(),
            patient_middlename: $(this).find('input[name="patient_middlename"]').val(),
            patient_email: $(this).find('input[name="patient_email"]').val(),
            comment: $(this).find('textarea[name="comment"]').val(),
            employeeid: window.localStorage.getItem('employeeid'),
        })
        loading(false)
        
            if (window.localStorage.getItem('verify_sms') == 'true') {
                ui.startCountdown()
                ui.sms_popup(true)
            } else {
                $('.Result .doctor').text(window.localStorage.getItem('choose2').split(',')[0])
                $('.Result .usluga').text(window.localStorage.getItem('choose1'))
                $('.Result .date').text(window.localStorage.getItem('choose2').split(',')[1])
                $('.Result .adr').text(window.localStorage.getItem('choose3'))
                
                api.create()
                    .then((res) => {
                        ui.step(5)
                    })
                    .catch((err) => {
                        console.log(err);
                        alert("Ошибка!")
                    });
            }
            window.localStorage.setItem('sent', true)
        } else {
            ui.sms_popup(true)
        }
    })

    $('.Confirm__phone .confirm, .resend').click(async function () {
        loading(true)
        let data = await api.sendForm({
            ...JSON.parse(window.localStorage.getItem('ticket')),
            code: $('input[name="code"]').val()
        })
        loading(false)
        if (data.error_messages) {
            $('input[name="code"]').notify(
                data.error_messages,
                { position: "bottom" }
            );
        } else if(data.wait_for_code == 0) {
            ui.sms_popup(false) 
            $('.Result .doctor').text(window.localStorage.getItem('choose2').split(',')[0])
            $('.Result .usluga').text(window.localStorage.getItem('choose1'))
            $('.Result .date').text(window.localStorage.getItem('choose2').split(',')[1])
            $('.Result .adr').text(window.localStorage.getItem('choose3'))
            api.create()
                .then((res) => {
                    ui.step(5)
                })
                .catch((err) => {
                    console.log(err);
                    alert("Ошибка!")
                });
        }
    })
    $('.resend').click(function () {
        $('input[name="code"]').notify(
            "Код отправлен",
            { position: "bottom" }
        );
        ui.startCountdown()
    })
    $('.policy1').click(function(e){
        e.preventDefault();
        $('.p1').addClass('active')
    })
    $('.policy2').click(function(e){
        e.preventDefault();
        $('.p2').addClass('active')
    })

    $('.print').unbind().click(function() {
        printTalon()
    })
}); 

function printTalon(path, test) {
    doctor_fio = $(".doctor").text();
    ticket_date = $(".date").text();
    doctor_address = $(".adr").text();
    patient_phone = $(".adr").text();
    patient_fio = $("#patient-fio").text();
    hospital_name = "";
    logo = $("#logo img").attr('src');
    room = $("#room").text();
            
    var print_window = window.open('', 'PRINT', 'height=400,width=600');
    print_window.document.write('<!DOCTYPE html><html><body>');
    
    print_window.document.write('<div class="container"><div class="main-step content-body current can-be-printed"><div class="mid"><div class="row"><div class="services-body register"><div class="col-lg-12"><h3 style="text-align:center">Запись на приём</h3></div><div class="col-lg-12"><div class="register-panel success-panel"><div class="row"><div class="col-lg-6 col-sm-6 col-xs-12"><h4>Информация о вашем приеме:</h4><p><strong>Доктор:</strong> <span id="doctor-fio">'+doctor_fio+'</span></p><p><strong>Дата:</strong> <span id="ticket-date">'+ticket_date+'</span></p><p><strong>Адрес:</strong> <span id="doctor-address">'+doctor_address+'</span></p><p style="display:none"><span id="patient-fio">'+patient_fio+'</span></p><p style="display:none"><span id="patient-phone">'+patient_phone+'</span></p><p style="display:none"><span id="room"></span></p></div></div></div></div></div></div></div></div></div></body></html>');

    print_window.document.close();
    print_window.focus();

    print_window.print();
    print_window.close();

    return true;
};
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
const templates = {
    specialty: ({name, id}) => {
        return (`
        <div class="Specialty__item" data-id="${id}">
            <div class="Specialty__title">${name}</div>
            <img src="./images/ar_card.svg"/>
        </div>
        `)
    },
    doctors: ({name, employeeid, description, photo_base64, employee_dto}) => {
        return (`
        <div class="Doctors__item" >
   <div style="background: url(${photo_base64
            ? photo_base64
            : './images/blank.jpg'})" class="Doctors__photo"></div>
   <div class="Doctors__body">
      <div>
         <p class="Doctors__body__name">${name}</p>
         <p class="Doctors__body__spec">${employee_dto.specialization.name}
         </p>
         <p class="Doctors__body__spec">${description
                ? description
                : ''}</p>
      </div>
      <div class="btn_cont lg">
         <p>Нажмите для выбора даты и времени</p>
         <div class="Doctors__choose btn" data-id="${employeeid}">Показать расписание</div>
      </div>
   </div>
   <div class="btn_cont nmd">
      <p>Нажмите для выбора даты и времени</p>
      <div class="Doctors__choose btn" data-id="${employeeid}">Показать расписание</div>
   </div>
   <div class="date_table">
      <p>Выберите адрес:</p>
      <div class="adr_container">
      </div>
      <p>Выберите удобное время:</p>
      <div class="date_table__ar">
         <div class="ar left_ar"></div>
         <div class="ar right_ar"></div>
      </div>
      <div class="table__container">
         <table>
            <tbody></tbody>
         </table>
      </div>
   </div>

   <div class="date_table_mobile">
   <p><img class="icon" src="./images/placeholder.png" alt=""> Выберите адрес:</p>
   <div class="adr_container_moblie">
            <select>
            </select>
   </div>
   <p><img class="icon" src="./images/date.png" alt=""> Выберите дату:</p>
            <div class="date_container">
                <div class="dates">
                
                </div>
            </div>

   <p><img class="icon" src="./images/clock.png" alt=""> Выберите удобное время:</p>
   <div class="table__container">
      <table>
         <tbody></tbody>
      </table>
   </div>
</div>
</div>
        `)
    },
    sheduleDay: ({data, date}) => {
        let hours = data.map(day => {
            return '<div class="Doctors__schedule__time" data-adr="' + time.branchid + '" data-date=' + day.start + ' >' + moment(day.start).format('HH:mm') + '</div>'
        }).join('');
        return (`
        <div class="Doctors__schedule__item">
            <div class="Doctors__schedule__item__header">
                ${moment(date).locale('ru').format('DD.MM')}
            </div>
            <div class="Doctors__schedule__body">
                ${hours}
            </div>
        </div>
        `)
    },
    getDefaultChooseDoctorTemplate: () => {
		return `
			<div class="Doctors__item">
				<div style="background: url('./images/blank.jpg')" class="Doctors__photo"></div>
				<div class="Doctors__body">
						<div><p class="Doctors__body__name">Не имеет значения</p>
						<p class="Doctors__body__spec">Будет показано свободное расписание всех врачей</p></div>
						<div class="btn_cont lg">
										<p>Нажмите для выбора даты и времени</p>
								 <div class="Doctors__choose all-doctors btn">Показать расписание</div>
						</div>
				</div>
				<div class="btn_cont nmd pt-0">
				<p>Нажмите для выбора даты и времени</p>
						 <div class="Doctors__choose all-doctors btn">Показать расписание</div>
				</div>
				<div class="date_table">
								<p>Выберите адрес:</p>
								<div class="adr_container">

								</div>
								<p>Выберите удобное время:</p>
						<div class="date_table__ar">
						<div class="ar left_ar"></div>
						<div class="ar right_ar"></div>
				</div>
				<div class="table__container">
						<table>
								<tbody></tbody>
						</table>
				</div>
				</div>
				<div class="date_table_mobile">
				<p><img class="icon" src="./images/placeholder.png" alt=""> Выберите адрес:</p>
				<div class="adr_container_moblie">
								 <select>
								 </select>
				</div>
				<p><img class="icon" src="./images/date.png" alt=""> Выберите дату:</p>
								 <div class="date_container">
										 <div class="dates">
										 
										 </div>
								 </div>
		 
				<p><img class="icon" src="./images/clock.png" alt=""> Выберите удобное время:</p>
				<div class="table__container">
					 <table>
							<tbody></tbody>
					 </table>
				</div>
		 </div>
		 </div>
		`
	}
}
const timeTable = {
	render: (da, data, date) => {
		return `
			<tr class="filled-bg">
				<td>${moment(date).locale('ru').format('MMMM')}</td>
				${timeTable.renderHeaderDays(data)}
				${timeTable.renderPartOfDayTimes('d1', 'Утром', da)}
				${timeTable.renderPartOfDayTimes('d2', 'Днем', da)}
				${timeTable.renderPartOfDayTimes('d3', 'Вечером', da)}
			</tr>
		`
	},
	renderMobile: (da) => {
		return `
			${timeTable.renderPartOfDayTimes('d1', 'Утром', da)}
			${timeTable.renderPartOfDayTimes('d2', 'Днем', da)}
			${timeTable.renderPartOfDayTimes('d3', 'Вечером', da)}
		`
	},
	renderHeaderDays: (days) => {
		let template = ``;

		days.map(day => {
			template += `<td class="time__header">${moment(day.date)
					.locale('ru')
					.format('dd, DD')}</td>`
		});

		return template;
	},
	renderPartOfDayTimes: (partId, partName, da) => {
		let timeLists = ``;
		da.map(dayTimes => timeLists += timeTable.renderPartOfDayTimeList(dayTimes[partId]));

		return `
			<tr>
				<td>${partName}</td>
				${timeLists}
			</tr>
		`;
	},
	renderPartOfDayTimeList: (times) => {
		let timeItems = ``;
		times.map(time => timeItems += timeTable.renderTimeItem(time));

		return `
			<td>
				<div class="time__list">${timeItems}</div>
			</td>
		`;
	},
	renderTimeItem: (time) => {
		return `<div class="time__item" data-app='{"appointment_datefrom":"${time
						.start}","appointment_dateto":"${time
						.end}", "appointment_scheduleid":"${time
						.scheduleid}"}' data-date="${time
						.start}" data-employeeid="${time
						.employeeid}" data-adr="${time
						.branchid}">${moment(time.start)
						.format('HH:mm')}</div>`;
	}
};
const reg_phone = '+7 843 255-55-56'
let timer = setInterval(() => {}, 5000)
// <div class="Specialty__icon"><img
// src="./images/icon/${name.toLowerCase()}.svg"/></div>
function onClickTimeItem(el) {
    //TODO: убрать дублирование (костыль при выборе доктора "Не имеет значения")
    if ($(el).data('employeeid')) return showDoctorPopupByTimeItem(el);

    API.appointment = $(el).data('app')

    const popup = $('.Doctors__popup'),
        photo = $(el)
            .closest('.Doctors__item')
            .find('.Doctors__photo')
            .attr('style'),
        name = $(el)
            .closest('.Doctors__item')
            .find('.Doctors__body__name')
            .text(),
        spec = $(el)
            .closest('.Doctors__item')
            .find('.Doctors__body__spec')
            .text(),
        date = $(el).data('date');
    window
        .localStorage
        .setItem('choose2', name + ', ' + moment(date).locale('ru').format('DD MMMM YYYY') + ' — ' + moment(date).format('HH:mm'))
    window
        .localStorage
        .setItem('choose3', $(el).closest('.Doctors__item').find('.adr_item.active').text())
    $(popup)
        .find('.Doctors__photo')
        .attr('style', photo)
    $(popup)
        .find('.Doctors__body__name')
        .text(name)
    $(popup)
        .find('.Doctors__body__spec')
        .text(spec)
    let adr;
    for (let a in API.branches) {
        if (API.branches[a].id == $(el).data('adr')) {
            adr = API.branches[a].address
        }
    }
    $(popup)
        .find('.Doctors__popup_t')
        .html(`
        <div>
        <div class="icon_row">
        <p><img class="icon" src="./images/placeholder.png" alt="">${adr}</p>
        </div>
        <div class="icon_row">
        <p><img class="icon" src="./images/date.png" alt="">${moment(date).locale('ru').format('DD MMMM YYYY')}</p>
        <p><img class="icon" src="./images/clock.png" alt="">${moment(date).format('HH:mm')}</p></div>
        </div>
    `)
    $(popup).addClass('active');

    window
        .localStorage
        .setItem('employeeid', $(el).closest('.Doctors__item').find('.btn').data('id'))

}

function showDoctorPopupByTimeItem(timeItem) {
    const employeeId = $(timeItem).data('employeeid');
    const doctorItem = $(`.Doctors__choose.btn[data-id='${employeeId}'`).closest('.Doctors__item');
    API.appointment = $(timeItem).data('app');

    const popup = $('.Doctors__popup'),
        photo = $(doctorItem).find('.Doctors__photo').attr('style'),
        name = $(doctorItem).find('.Doctors__body__name').text(),
        spec = $(doctorItem).find('.Doctors__body__spec').text(),
        date = $(timeItem).data('date');
    window
        .localStorage
        .setItem('choose2', name + ', ' + moment(date).locale('ru').format('DD MMMM YYYY') + ' — ' + moment(date).format('HH:mm'))
    window
        .localStorage
        .setItem('choose3', $(timeItem).closest('.Doctors__item').find('.adr_item.active').text())
    $(popup)
        .find('.Doctors__photo')
        .attr('style', photo)
    $(popup)
        .find('.Doctors__body__name')
        .text(name)
    $(popup)
        .find('.Doctors__body__spec')
        .text(spec)
    let adr;
    for (let a in API.branches) {
        if (API.branches[a].id == $(timeItem).data('adr')) {
            adr = API.branches[a].address
        }
    }
    $(popup)
        .find('.Doctors__popup_t')
        .html(`
        <div>
        <div class="icon_row">
        <p><img class="icon" src="./images/placeholder.png" alt="">${adr}</p>
        </div>
        <div class="icon_row">
        <p><img class="icon" src="./images/date.png" alt="">${moment(date).locale('ru').format('DD MMMM YYYY')}</p>
        <p><img class="icon" src="./images/clock.png" alt="">${moment(date).format('HH:mm')}</p></div>
        </div>
    `)
    $(popup).addClass('active');

    window
        .localStorage
        .setItem('employeeid', employeeId)

}

function loading(bool) {
    if (bool) {
        $('.loader').addClass('active')
    } else {
        $('.loader').removeClass('active')
    }
}

$('.steps__item')
    .click(function () {
        if ($(this).data('g_step') && window.localStorage.getItem('g_step') > $(this).data('g_step')) {
            loading(true);
            ui.step($(this).data('g_step'))
            setTimeout(function () {
                loading(false);
            }, 1000)
        }
    })

const steps = ["Выберите специальность", "Выберите доктора", "Вы записываетесь на прием к специалисту", "Зарегистрируйтесь", "Вы успешно записаны"]

const ui = {
    step: function (index) {
        clearInterval(timer)
        window
            .localStorage
            .setItem('g_step', index)
        window
            .localStorage
            .setItem('sent', false)
        $('input').val('')
        $('[data-step]').removeClass('fade-in')
        setTimeout(function () {
            $('[data-step=' + index + ']').addClass('fade-in');
            $('.Step__name').text(steps[index - 1])

            $('.steps__item')
                .removeClass('active')
                .removeClass('done')
            $('.bc').text('')
            switch (index) {
                case 1:
                    $('div.steps__item:nth-child(1)').addClass('active');
                    break;
                case 2:
                    $('div.steps__item:nth-child(1)').addClass('done');
                    $('div.steps__item:nth-child(2)').addClass('done');
                    $('div.steps__item:nth-child(3)').addClass('active');
                    $('.bc').text('Вы выбрали: ' + window.localStorage.getItem('choose1'));
                    break;
                case 3:
                    $('div.steps__item:nth-child(1)').addClass('done');
                    $('div.steps__item:nth-child(2)').addClass('done');
                    $('div.steps__item:nth-child(3)').addClass('active');
                    break;
                case 4:
                    $('.bc').text('Вы выбрали: ' + window.localStorage.getItem('choose1') + '  ' + window.localStorage.getItem('choose2'));
                    $('div.steps__item:nth-child(1)').addClass('done');
                    $('div.steps__item:nth-child(2)').addClass('done');
                    $('div.steps__item:nth-child(3)').addClass('done');
                    $('div.steps__item:nth-child(4)').addClass('active');
                    break;
                case 5:
                    $('div.steps__item:nth-child(1)').addClass('done');
                    $('div.steps__item:nth-child(2)').addClass('done');
                    $('div.steps__item:nth-child(3)').addClass('done');
                    $('div.steps__item:nth-child(4)').addClass('active');
                    $('div.steps__item:nth-child(5)').addClass('done');
                    $('.p3').addClass('active');

                    break;

                default:
                    break;
            }
        }, 300)

    },
    drawSpecialty: async function (data) {
        loading(true)

        if (!window.localStorage.getItem('hide_sex_and_age')) {
            $('.hide_sex_and_age').hide();
        }

        data = data
            ? data
            : await api.getSpecialty();
        $('.Specialty').html('')
        data.map(item => {
            $('.Specialty').append(templates.specialty(item))
        })
        loading(false)
        $('.Specialty__item').click(async function () {
            loading(true)

            window
                .localStorage
                .setItem('choose1', $(this).find('.Specialty__title').text())

            let data = await api.getDoctors($(this).data('id'));
            ui.drawDoctors(data)
            $('html, body')
                .stop()
                .animate({
                    scrollTop: 0
                }, 1000)
            ui.step(2);

            loading(false)
        })
    },
    drawDoctors: async function (data) {
        $('.Doctors').html('')
        loading(true)

        if (data.length > 1) {
            $('.Doctors').append(templates.getDefaultChooseDoctorTemplate());

            $('.Doctors__item .all-doctorsasfas').click(async function () {
                if ($(this).hasClass('active')) {
                    $(this).text('Показать расписание');
                    $(this)
                        .closest('.Doctors__item')
                        .find('.date_table')
                        .slideUp('ease')
                    $(this)
                        .closest('.Doctors__item')
                        .find('.date_table_mobile')
                        .slideUp('ease')

                    $(this)
                        .closest('.Doctors__item')
                        .find('.not_found')
                        .slideUp('ease')
                    $(this).removeClass('active')
                    return;
                }

                $(this)
                    .addClass('active')
                    .text('Скрыть расписание')

                loading(true)
                let data = await api.getDoctor(Object.keys(API.doctors))

                data

                let d = {}

                function drawTable(da, data, date) {
                    if (da == 'all') {
                        let all = []

                        for (let k in d) {
                            d[k].map((array, idx) => {
                                if (!all[idx]) {
                                    all.push({d1: [], d2: [], d3: []})
                                }
                                all[idx] = {
                                    d1: all[idx]
                                        .d1
                                        .concat(array.d1),
                                    d2: all[idx]
                                        .d2
                                        .concat(array.d2),
                                    d3: all[idx]
                                        .d3
                                        .concat(array.d3)
                                }
                            })
                        }

                        da = all
                    }

                    return timeTable.render(da, data, date);
                }

                function drawTableMobile(da, idx) {
                    console.log("DAY", idx, da)

                    if (da == 'all') {
                        let all = []

                        for (let k in d) {
                            d[k].map((array, idx) => {
                                if (!all[idx]) {
                                    all.push({d1: [], d2: [], d3: []})
                                }
                                all[idx] = {
                                    d1: all[idx]
                                        .d1
                                        .concat(array.d1),
                                    d2: all[idx]
                                        .d2
                                        .concat(array.d2),
                                    d3: all[idx]
                                        .d3
                                        .concat(array.d3)
                                }
                            })
                        }

                        da = all
                    }

                    da = [da[idx]]

                    return timeTable.renderMobile(da);
                }
                data = data.sort(function (a, b) {
                    return a.data.length > b.data.length
                });
                if (data.length) {
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

                        $(this)
                            .closest('.Doctors__item')
                            .find('.adr_container')
                            .html('')
                            .append(adr_template)

                        $(this)
                            .closest('.Doctors__item')
                            .find('.adr_container_moblie')
                            .html("<select>" + adr_template_mobile + "</select>")

                        $(this)
                            .closest('.Doctors__item')
                            .find('.adr_item')
                            .first()
                            .addClass('active')

                        $(this)
                            .closest('.Doctors__item')
                            .find('.adr_item')
                            .click(function () {

                                let ap = $(this).data('id') == 'all'
                                    ? 'all'
                                    : d[$(this).data('id')];

                                $(this)
                                    .closest('.Doctors__item')
                                    .find('.adr_item')
                                    .removeClass('active')

                                $(this)
                                    .addClass('active')
                                    .closest('.Doctors__item')
                                    .find('.date_table tbody')
                                    .html('')
                                    .append(drawTable(ap, data, data[0] ? data[0].date : date))

                                $(this)
                                    .closest('.Doctors__item')
                                    .find('.time__item')
                                    .click(function () {
                                        onClickTimeItem(this)
                                    })
                            })
                        let first = $(this)
                            .closest('.Doctors__item')
                            .find('.adr_item')
                            .data('id') == 'all'
                            ? 'all'
                            : d[Object.keys(d)[0]]

                            $(this)
                                .closest('.Doctors__item')
                                .find('.date_container .dates')
                                .html('')
                        data.map((day, idx) => {
                            $(this)
                                .closest('.Doctors__item')
                                .find('.date_container .dates')
                                .append(`<div class="mobile_date_item" data-date="${idx}">${moment(day.date).locale('ru').format('dd</br> DD')}</div>`)
                        })

                        $(this)
                            .closest('.Doctors__item')
                            .find('.mobile_date_item')
                            .first()
                            .addClass('active')

                        $(this)
                            .closest('.Doctors__item')
                            .find('.date_table tbody')
                            .html('')
                            .append(drawTable(first, data, data[0] ? data[0].date : date))

                        $(this)
                            .closest('.Doctors__item')
                            .find('.date_table_mobile tbody')
                            .html('')
                            .append(drawTableMobile(first, 0))

                        $(this)
                            .closest('.Doctors__item')
                            .find('.mobile_date_item')
                            .click(function () {
                                $(this)
                                    .closest('.Doctors__item')
                                    .find('.mobile_date_item')
                                    .removeClass('active')
                                $(this).addClass('active')

                                $(this)
                                    .closest('.Doctors__item')
                                    .find('.date_table_mobile tbody')
                                    .html('')
                                    .append(drawTableMobile(first, + $(this).data('date')))

                                $(this)
                                    .closest('.Doctors__item')
                                    .find('.time__item')
                                    .click(function () {
                                        onClickTimeItem(this)
                                    })
                            })
                    })

                    $(this)
                        .addClass('active')
                        .text('Скрыть расписание')

                    $(this)
                        .closest('.Doctors__item')
                        .find('.date_table')
                        .slideDown('ease')

                    $(this)
                        .closest('.Doctors__item')
                        .find('.date_table_mobile')
                        .slideDown('ease')

                    if (document.body.clientWidth < 768) {

                        $('html, body')
                            .stop()
                            .animate({
                                scrollTop: $(this)
                                    .closest('.Doctors__item')
                                    .find('.date_table_mobile')
                                    .offset()
                                    .top
                            }, 1000)
                    } else {
                        $('html, body')
                            .stop()
                            .animate({
                                scrollTop: $(this)
                                    .closest('.Doctors__item')
                                    .find('.date_table')
                                    .offset()
                                    .top
                            }, 1000)
                    }

                    let m = 0;
                    $(this)
                        .closest('.Doctors__item')
                        .find('.right_ar')
                        .click(function () {
                            let t = $(this)
                                .closest('.Doctors__item')
                                .find('table');
                            let container = $(this)
                                .closest('.Doctors__item')
                                .find('.date_table__ar')
                                .width()
                            let range = 250;
                            m -= Math.abs(m) < $(t).width() - container / 2
                                ? range
                                : 0;
                            $(t).css('left', m);
                        })
                    $(this)
                        .closest('.Doctors__item')
                        .find('.left_ar')
                        .click(function () {
                            let t = $(this)
                                .closest('.Doctors__item')
                                .find('table');
                            let range = 250;
                            m += m != 0
                                ? range
                                : 0;
                            $(t).css('left', m);
                        })
                    $(this)
                        .closest('.Doctors__item')
                        .find('.time__item')
                        .click(function () {
                            onClickTimeItem(this)
                        })
                } else {
                    $(this)
                        .addClass('active')
                        .text('Скрыть расписание')
                    $('html, body')
                        .stop()
                        .animate({
                            scrollTop: $(this)
                                .closest('.Doctors__item')
                                .find('.date_table')
                                .offset()
                                .top
                        }, 1000)
                    $(this)
                        .closest('.Doctors__item')
                        .append(`<div class="not_found">Извините, по выбранным параметрам талоны не найдены, обратитесь в регистратуру по телефону ${reg_phone}</div>`)

                }

                // ui.(data) ui.step(3)
                loading(false)

            })
        }

        data.map(item => {
            $('.Doctors').append(templates.doctors(item))
        })
        loading(false)
        $('.Doctors__item .btn:not(.all-doctors)').click(async function () {

            if ($(this).hasClass('active')) {
                $(this).text('Показать расписание');
                $(this)
                    .closest('.Doctors__item')
                    .find('.date_table')
                    .slideUp('ease')

                $(this)
                    .closest('.Doctors__item')
                    .find('.date_table_mobile')
                    .slideUp('ease')
                $(this)
                    .closest('.Doctors__item')
                    .find('.not_found')
                    .slideUp('ease')
                $(this).removeClass('active')
                return;
            }

            loading(true)
            let data = await api.getDoctor([$(this).data('id')]);
            let d = {}
    
            function drawTable(da, data, date) {
                if (da == 'all') {
                    let all = []
            
                    for (let k in d) {
                        d[k].map((array, idx) => {
                            if (!all[idx]) {
                                all.push({d1: [], d2: [], d3: []})
                            }
                            all[idx] = {
                                d1: all[idx]
                                    .d1
                                    .concat(array.d1),
                                d2: all[idx]
                                    .d2
                                    .concat(array.d2),
                                d3: all[idx]
                                    .d3
                                    .concat(array.d3)
                            }
                        })
                    }
            
                    da = all
                }
        
                return timeTable.render(da, data, date);
            }

            function drawTableMobile(da, idx) {
                console.log("DAY", idx, da)

                if (da == 'all') {
                    let all = []

                    for (let k in d) {
                        d[k].map((array, idx) => {
                            if (!all[idx]) {
                                all.push({d1: [], d2: [], d3: []})
                            }
                            all[idx] = {
                                d1: all[idx]
                                    .d1
                                    .concat(array.d1),
                                d2: all[idx]
                                    .d2
                                    .concat(array.d2),
                                d3: all[idx]
                                    .d3
                                    .concat(array.d3)
                            }
                        })
                    }

                    da = all
                }

                da = [da[idx]]

                return timeTable.renderMobile(da);
            }

            if (data.length) {
                data.map(({data, date}) => {
                    data.map(day => {
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

                                    d[branch.id].push({d1, d2, d3})
                                }
                            })
                    })
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
                        adr_template = `<div class='adr_item' data-id='all' data-adr='${JSON.stringify(l)}'>Все</div>` + adr_template
                        adr_template_mobile = `<option data-id='all' data-adr='${JSON.stringify(l)}' value='all'>Все</option>`
                    }

                    $(this)
                        .closest('.Doctors__item')
                        .find('.adr_container')
                        .html('')
                        .append(adr_template)

                    $(this)
                        .closest('.Doctors__item')
                        .find('.adr_container_moblie')
                        .html("<select>" + adr_template_mobile + "</select>")

                    $(this)
                        .closest('.Doctors__item')
                        .find('.adr_item')
                        .first()
                        .addClass('active')

                    $(this)
                        .closest('.Doctors__item')
                        .find('.adr_item')
                        .click(function () {
                            let ap = $(this).data('id') == 'all'
                                ? 'all'
                                : d[$(this).data('id')];
                            $(this)
                                .closest('.Doctors__item')
                                .find('.adr_item')
                                .removeClass('active')
                            $(this)
                                .addClass('active')
                                .closest('.Doctors__item')
                                .find('.date_table tbody')
                                .html('')
                                .append(drawTable(ap, data, data[0] ? data[0].date : date))

                            $(this)
                                .closest('.Doctors__item')
                                .find('.time__item')
                                .click(function () {
                                    onClickTimeItem(this)
                                })
                        })

                    $(this)
                        .closest('.Doctors__item')
                        .find('.adr_container_moblie select')
                        .change(function () {
                            let ap = $(this).value == 'all'
                                ? 'all'
                                : d[$(this).data('id')];
                            console.log(ap)
                            $(this)
                                .closest('.Doctors__item')
                                .find('.adr_item')
                                .removeClass('active')
                            $(this)
                                .closest('.Doctors__item')
                                .find('.date_table_mobile tbody')
                                .html('')
                                .append(drawTable(ap, 0))

                            $(this)
                                .closest('.Doctors__item')
                                .find('.time__item')
                                .click(function () {
                                    onClickTimeItem(this)
                                })
                        })
                    let first = $(this)
                        .closest('.Doctors__item')
                        .find('.adr_item')
                        .data('id') == 'all'
                        ? 'all'
                        : d[Object.keys(d)[0]]

                        $(this)
                            .closest('.Doctors__item')
                            .find('.date_container .dates')
                            .html('')
                    data.map((day, idx) => {
                        $(this)
                            .closest('.Doctors__item')
                            .find('.date_container .dates')
                            .append(`<div class="mobile_date_item" data-date="${idx}">${moment(day.date).locale('ru').format('dd</br> DD')}</div>`)
                    })

                    $(this)
                        .closest('.Doctors__item')
                        .find('.mobile_date_item')
                        .first()
                        .addClass('active')

                    $(this)
                        .closest('.Doctors__item')
                        .find('.date_table tbody')
                        .html('')
                        .append(drawTable(first, data, data[0] ? data[0].date : date))

                    $(this)
                        .closest('.Doctors__item')
                        .find('.date_table_mobile tbody')
                        .html('')
                        .append(drawTableMobile(first, 0))

                    $(this)
                        .closest('.Doctors__item')
                        .find('.mobile_date_item')
                        .click(function () {
                            $(this)
                                .closest('.Doctors__item')
                                .find('.mobile_date_item')
                                .removeClass('active')
                            $(this).addClass('active')

                            $(this)
                                .closest('.Doctors__item')
                                .find('.date_table_mobile tbody')
                                .html('')
                                .append(drawTableMobile(first, + $(this).data('date')))

                            $(this)
                                .closest('.Doctors__item')
                                .find('.time__item')
                                .click(function () {
                                    onClickTimeItem(this)
                                })
                        })

                })
                $(this)
                    .addClass('active')
                    .text('Скрыть расписание')

                $(this)
                    .closest('.Doctors__item')
                    .find('.date_table')
                    .slideDown('ease')
                //mobile
                $(this)
                    .closest('.Doctors__item')
                    .find('.date_table_mobile')
                    .slideDown('ease')
                if (document.body.clientWidth < 768) {

                    $('html, body')
                        .stop()
                        .animate({
                            scrollTop: $(this)
                                .closest('.Doctors__item')
                                .find('.date_table_mobile')
                                .offset()
                                .top
                        }, 1000)
                } else {
                    $('html, body')
                        .stop()
                        .animate({
                            scrollTop: $(this)
                                .closest('.Doctors__item')
                                .find('.date_table')
                                .offset()
                                .top
                        }, 1000)
                }
                let m = 0;
                $(this)
                    .closest('.Doctors__item')
                    .find('.right_ar')
                    .click(function () {
                        let t = $(this)
                            .closest('.Doctors__item')
                            .find('table');
                        let container = $(this)
                            .closest('.Doctors__item')
                            .find('.date_table__ar')
                            .width()
                        let range = 250;
                        m -= Math.abs(m) < $(t).width() - container / 2
                            ? range
                            : 0;
                        $(t).css('left', m);
                    })
                $(this)
                    .closest('.Doctors__item')
                    .find('.left_ar')
                    .click(function () {
                        let t = $(this)
                            .closest('.Doctors__item')
                            .find('table');
                        let range = 250;
                        m += m != 0
                            ? range
                            : 0;
                        $(t).css('left', m);
                    })
                $(this)
                    .closest('.Doctors__item')
                    .find('.time__item')
                    .click(function () {
                        onClickTimeItem(this)
                    })
            } else {

                $(this)
                    .addClass('active')
                    .text('Скрыть расписание')

                $(this)
                    .closest('.Doctors__item')
                    .append(`<div class="not_found">
                Извините, по выбранным параметрам талоны не найдены, обратитесь в регистратуру по телефону ${reg_phone}
               
            </div>`)
                $('html, body')
                    .stop()
                    .animate({
                        scrollTop: $(this)
                            .closest('.Doctors__item')
                            .find('.not_found')
                            .offset()
                            .top
                    }, 1000)
            }

            // ui.(data) ui.step(3)
            loading(false)

        })
    },
    drawShedule: async function (data) {
        if (!data.length) {
            $('.Doctors__schedule__container').html(`
                <div class="not_found">
                    Извините, по выбранным параметрам талоны не найдены, обратитесь в регистратуру по телефону ${reg_phone}
                    <br/>
                    <div class="btn-back" onclick="ui.step(2)">Назад</div>
                </div>
            `);
            return;
        }
        data.map(({data: item}) => {
            item.map(day => {
                $('.Doctors__schedule__container').append(templates.sheduleDay(day))
            })
        })
    },
    sms_popup: function (flag) {
        if (flag) {
            $('.popup').addClass('active');
            setTimeout(() => {
                document
                    .getElementById("code")
                    .focus()
            }, 300)
        } else {
            $('.popup').removeClass('active');
        }
    },
    popup: function (flag) {
        if (flag) {
            $('.policy_popup').addClass('active');
        } else {
            $('.policy_popup').removeClass('active');
        }
    },
    startCountdown: function () {
        window
            .localStorage
            .setItem('timer', 300)
        $('.countdown').show()
        $('.resend').hide()
        timer = setInterval(() => {
            let curTime = +window
                .localStorage
                .getItem('timer')

            let min = Math.floor(curTime / 60)
            let sec = curTime % 60

            sec = String(sec).length == 1
                ? '0' + sec
                : sec;

            $('.countdown span').text(`${min}:${sec}`)

            if (curTime > 0) {
                curTime--;
                window
                    .localStorage
                    .setItem('timer', curTime)
            } else {
                $('.countdown').hide()
                $('.resend').show()
                clearInterval(timer)
            }

        }, 1000)
    }
}
