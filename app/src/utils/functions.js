import * as dayjs from 'dayjs'

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



export const download = e => {
  fetch(e, {
    method: "GET",
    headers: {}
  })
    .then(response => {
      console.log('response', response)
      // response.arrayBuffer().then(function(buffer) {
      //   const url = window.URL.createObjectURL(new Blob([buffer]))
      //   const link = document.createElement("a")
      //   link.href = url
      //   link.setAttribute("download", "image.png") //or any other extension
      //   document.body.appendChild(link);
      //   link.click();
      //});
    })
    .catch(err => {
      console.log(err);
    })
}


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