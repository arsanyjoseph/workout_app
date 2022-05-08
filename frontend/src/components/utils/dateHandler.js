const handleZero = (z) => {
    if (z < 10) {
        return (z = '0' + z)
    }
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const handleDate = (i)=> {
    const date = new Date (i)
    let year = date.getFullYear()
    let month = months[date.getMonth()]
    let day = date.getDate()
    let hours = date.getUTCHours()
    let minutes = date.getUTCMinutes()
    if(hours < 10) {
        hours = '0' + hours
    }

    if(minutes < 10) {
        minutes = '0' + minutes
    }

    if(day < 10) {
        day = '0' + day
    }

    return (month + ' ' + day + ', ' + year + ' at ' + hours + ':' + minutes)
}

export default handleDate