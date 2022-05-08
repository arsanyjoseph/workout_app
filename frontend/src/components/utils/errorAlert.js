const handleErr = (setState)=> {
    setState(true)
    setTimeout(() => {
        setState(false)
    }, 5000);
}

export default handleErr