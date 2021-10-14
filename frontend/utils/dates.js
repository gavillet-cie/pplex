export const months = {
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  fr: [
    'janvier',
    'février',
    'mars',
    'avril',
    'mai',
    'juin',
    'juillet',
    'août',
    'septembre',
    'octobre',
    'novembre',
    'décembre',
  ],
}

export const getDate = (dateString, lang) => {
  const selectedMonths = months[lang] || months.en
  const date = new Date(dateString)
  const month = date.getMonth()
  const year = date.getFullYear()
  const day = date.getDate()
  return `${day} ${selectedMonths[month]} ${year}`
}
