const searchArray = (userId, myArray) => {
    for (let i=0; i < myArray.length; i++) {
        if (myArray[i]._id === userId) {
            return (`${myArray[i].firstName + ' ' + myArray[i].lastName}`)
        }
    }
}

export default searchArray