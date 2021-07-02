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