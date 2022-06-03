const moment = require('moment')

const eventDateHandler = (date , dayIndex)=> {
    let start = moment(date)
    let day = start.date() + dayIndex
    let month = start.month() + 1
    let year = start.year()

    if(day < 10) {
        day = '0' + day
    }

    if (month < 10) {
        month = '0' + month
    }
    return `${year}-${month}-${day}`
}

module.exports = {
    eventDateHandler
}