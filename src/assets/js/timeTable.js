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