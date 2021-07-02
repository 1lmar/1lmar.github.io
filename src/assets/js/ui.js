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
