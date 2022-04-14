import Header from '../components/header'
import './css/landingPage2.css'
import { FaArrowDown } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import ImgMediaCard from '../components/card'

function useOnScreen(options) {
    const ref = useRef()
    const [visible, setVisible] = useState(false)

    useEffect(()=> {
        const observer = new IntersectionObserver(([entry])=> {
            setVisible(entry.isIntersecting)
        }, options)

        if (ref.current) {
            observer.observe(ref.current)
        }

        return ()=> {
            if(ref.current) {
                observer.unobserve(ref.current)
            }
        }
    },[ref, options])

    return [ref, visible]
}
     
export default function LandingPage2 () {
    const [ref, visible] = useOnScreen({rootmargin: '0px', threshold: 0.6})
    const {user} = useSelector((state)=> { return state.auth})
    const images = ['plan2.jpg', 'plan3.jpg', 'plan5.jpg']
    
    const scrollFunc = () => {
        const feature = document.getElementById('personal')

        feature.scrollIntoView({
          behavior: 'smooth',
        })
    }
    useEffect (()=> {
        
    },[user])
    return <>
    <div className='landingContainer'>
        <div className='gradientContainer'>
             {user ? <Header name={user.firstName}/> : <Header/>}
            <div className="showContainer">
                <h1>Hello World</h1>
                <p>You are Welcome to <a href='/login'>Join Us</a></p>
                <p>Explore More</p>
                <a className='arrowIcon' onClick={scrollFunc}><FaArrowDown/></a>
            </div>  
        </div>
        <section id='personal'>
            <div className='quoteContainer'>
                <div className='personalImg'>
                    <img src="../assets/about/me3.jpg" alt="M.Alaa" />
                </div>
                <div className="quoteDetails">
                    <aside>
                        <h1>Hello Wolrd</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur recusandae fugit distinctio odit error blanditiis minus non, nesciunt ipsa mollitia exercitationem. Minus, voluptatem voluptate nisi nemo ut magni error consequuntur.</p>
                    </aside>
                    <aside>
                        <h1>Hello Wolrd</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur recusandae fugit distinctio odit error blanditiis minus non, nesciunt ipsa mollitia exercitationem. Minus, voluptatem voluptate nisi nemo ut magni error consequuntur.</p>
                    </aside>
                </div>
            </div>
        </section>
        <section id='features'>
            <div  ref={ref} className={visible ? 'cardsContainer showCard' : 'cardsContainer'}>
                {images.map((value, index)=> <ImgMediaCard key={index} name='M.Alaa' paragraph='Try This' src={`../assets/gallery/${value}`} />)}
            </div>
        </section>  
    </div>
    </>
}