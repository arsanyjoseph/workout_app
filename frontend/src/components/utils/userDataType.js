const extractType = (arr, type) => {
    let newArr = [];
    arr.map((item, index)=> {
        if(item.type == type) {
            newArr.push(item)
        }
    })
    return newArr
}

export default extractType