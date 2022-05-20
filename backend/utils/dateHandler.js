const handleDate = (i) => {
    date = new Date(i)
    return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
}

module.exports = {handleDate}
