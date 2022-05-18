const eventDateHandler = (date , dayIndex)=> {
    let start = new Date(date)
    let day = start.getDate() + 1 + dayIndex
    let month = start.getMonth() + 1
    let year = start.getFullYear()

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