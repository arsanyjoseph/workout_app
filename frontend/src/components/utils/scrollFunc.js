 const scrollFunc = (id) => {
    const section = document.getElementById(id)

    section.scrollIntoView({
      behavior: 'smooth',
    })
}

export default scrollFunc