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