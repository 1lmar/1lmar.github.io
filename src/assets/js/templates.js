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