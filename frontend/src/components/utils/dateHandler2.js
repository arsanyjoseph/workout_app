
const handleDate2 = (i) => {
    date = new Date(i)
    return date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate()
}

export default handleDate2
