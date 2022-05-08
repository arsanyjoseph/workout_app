const extractData = (id, myArray) => {
    for (let i=0; i < myArray.length; i++) {
        if (myArray[i]._id == id) {
            return myArray[i].name
        } 
    }
}

export default extractData