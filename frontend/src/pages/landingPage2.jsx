import Header from '../components/header'
import Footer from '../components/footer/footer'
import './css/landingPage2.css'
import { FaArrowDown } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import ImgMediaCard from '../components/card'
import scrollFunc from '../components/utils/scrollFunc';
import { useNavigate } from 'react-router-dom';

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
    const {user} = useSelector((state)=> state.auth)
    const images = ['plan2.jpg', 'plan3.jpg', 'plan5.jpg']
    const navigate = useNavigate()
    
    useEffect (()=> {
        if(user) {
            navigate('/home')
        }
    
    },[user])
    return <>
    <div className='landingContainer'>
        <div className='gradientContainer'>
             <Header/>
            <div className="showContainer" id='banner'>
                <h1>Welcome to Calisthenics World</h1>
                <p>Start Your Journey Safely, <a href='/login'>Join Us</a></p>
                <p>Explore More</p>
                <a className='arrowIcon' onClick={()=>scrollFunc('personal')}><FaArrowDown/></a>
            </div>  
        </div>
        <section id='personal'>
            <div className='quoteContainer'>
                <div className='personalImg'>
                    <img src="../assets/about/me3.jpg" alt="M.Alaa" />
                </div>
                <div  ref={ref} className={visible ? 'quoteDetails showCard' : 'quoteDetails'}>
                    <aside>
                        <h1>Provide Impairing Training And Best Fitness Motivations</h1>
                        <p>Hey everyone! I am Mohammed, your new Trainer. I am ISA a certified strength, conditioning and sports nutrition Specialist. I started Calisthenincs back in 2015 with zero knowledge.</p>
                    </aside>
                    <aside>
                        <h1>How Did I start ?</h1>
                        <p>I spent quite time confused about where to begin, trying a bunch of different ways to get on top of my fitness and life. </p>
                        <p>But now -by My Coaching- you will never be left frustrated about your transformation journey, calisthenincs skills and nutrition. Because We are Different, every Client has a customized plan. Each will have a great potential with a clear plan</p>
                    </aside>
                </div>
            </div>
        </section>
        <section id='features'>
            <div className='cardsContainer'>
                {images.map((value, index)=> <ImgMediaCard key={index} name='M.Alaa' paragraph='Try This' src={`../assets/gallery/${value}`} />)}
            </div>
        </section> 
        <section id='testimonials'>
            <div className='ratesContainer'>
                <div className='gradientOverlay'>
                    <div className='testDetails'></div>
                </div>
            </div>
        </section> 
        <footer>
                <Footer/>
        </footer>
    </div>
    </>
}