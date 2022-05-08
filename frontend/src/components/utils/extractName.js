const searchArray = (id, myArray, param) => {
    for (let i=0; i < myArray.length; i++) {
        if (myArray[i]._id == id) {
                return myArray[i].firstName + ' ' + myArray[i].lastName
        } 
    }
}

export default searchArray