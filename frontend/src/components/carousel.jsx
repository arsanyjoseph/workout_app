import './carousel.css'
import {useEffect, useState} from 'react'

export default function Carousel () {
    const images = ['../assets/banner/banner-1.jpg', '../assets/banner/banner-2.jpg', '../assets/banner/banner-3.jpg']

    const handleClick = (e)=> {
        const num = parseInt(e.target.id)
        setImage(num)
    }
    const [image, setImage] = useState(0)
    const handleImage = () => {
        if (image === 2) {
            setImage(0)
        } else {
            setImage(image + 1)
        }
    }
    useEffect(()=> {
        const timer = setTimeout(() => {
            handleImage()
        }, 5000);
        return ()=> clearTimeout(timer)
    },[image])

    return (
        <div className="carouselContainer" style={{backgroundImage: `url(${images[image]})`}}>
            <div className="dots">
                {images.map((value, index)=> <span onClick={handleClick} id={index} key={index}></span>)}
                
            </div>
        </div>
    )
}