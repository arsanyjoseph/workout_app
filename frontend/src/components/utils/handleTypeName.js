const handleName = (i)=> {
    const capitalized = capitalizeFirst(i)
    if (capitalized === 'Cooldown') {
        const addSpace = capitalized.substring(0, 4) + ' ' + capitalized.substring(4, capitalized.length) 
        return addSpace
    } else if (capitalized === 'Warmup') {
        const addSpace = capitalized.substring(0, 4) + ' ' + capitalized.substring(4, capitalized.length) 
        return addSpace
    } else if (capitalized === 'Exercise') {
        return capitalized
    } else {
        return i
    }
}


const capitalizeFirst = (i) => {
    const capitalFirst = i.charAt(0).toUpperCase() + i.slice(1)
    return capitalFirst
}

export default handleName