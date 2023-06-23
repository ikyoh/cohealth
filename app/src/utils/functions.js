import * as dayjs from 'dayjs'
import fileDownload from 'js-file-download'
import { API_URL } from '../config/api.config'
import axios from 'axios'

export const generatePassword = (length = 8) => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let password = ""
    for (let i = 0; i <= length; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password
}

/**
 * Calcul le total des params de l'array
 * @returns number
 * @param {array} array - tableau à calculer
 * @param {string} param - paramétre à additionner
 * @param {integer} round - valeur de l'arrondi
*/
export const calcTotalParamFromArray = (array, param, round = 0) => {
	return (
		array.reduce(function (acc, curr) {
			return (parseFloat(acc) + parseFloat(curr[param])).toFixed(round)
		}, 0))
}



export const downloadFile = (item) => {
	axios({
		url: item.contentUrl,
		method: 'GET',
		responseType: 'blob', // Important
	}).then((response) => {
		fileDownload(response.data, item.filePath);
	});
};


export const calcNumberOfDays = (beginAt, endAt) => {
	const begin = dayjs(beginAt)
	const end = dayjs(endAt).add(1, 'day')
	return (end.diff(begin, 'days'))
}

export const calcNumberOfWeeks = (beginAt, endAt) => {
	const begin = dayjs(beginAt)
	const end = dayjs(endAt)
	return (end.diff(begin, 'weeks') + 1)
}

export const calcNumberOfMonths = (beginAt, endAt) => {
	const begin = dayjs(beginAt)
	const end = dayjs(endAt)
	return (end.diff(begin, 'months') + 1)
}

// services = selected services {}
// category = "A" || "B" || "C" || "N"
export const calcABCN = (category, services, beginAt, endAt) => {

	//console.log('Number(calcNumberOfDays(beginAt, endAt))', Number(calcNumberOfDays(beginAt, endAt)))

	let filteredServices = services.filter(service => service.category === category)

	let total = filteredServices.reduce((acc, curr) => {
		if (curr.periodicity === "période")
			return Number(curr.time) * Number(curr.frequency) + acc
		if (curr.periodicity === "jour")
			return Number(curr.time) * Number(curr.frequency) * Number(calcNumberOfDays(beginAt, endAt)) + acc
		if (curr.periodicity === "semaine")
			return Number(curr.time) * Number(curr.frequency) * Number(calcNumberOfWeeks(beginAt, endAt)) + acc
		if (curr.periodicity === "mois")
			return Number(curr.time) * Number(curr.frequency) * Number(calcNumberOfMonths(beginAt, endAt)) + acc
	}, 0)

	return total
}

export const calcMinutestoHours = (minutes) => {
	return Math.round(minutes * 100 / 60) / 100
} 