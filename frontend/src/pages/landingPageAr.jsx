import Header from '../components/header'
import Footer from '../components/footer/footer'
import './css/landingPageAr.css'
import './css/landingPage2.css'
import { FaArrowDown } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import ImgMediaCard from '../components/card-landingPage/card'
import scrollFunc from '../components/utils/scrollFunc';
import { useNavigate } from 'react-router-dom';
import memberships from '../components/utils/memberships';

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
     
export default function LandingPageAr () {
    const [ref, visible] = useOnScreen({rootmargin: '0px', threshold: 0.6})
    const {user} = useSelector((state)=> state.auth)
    const navigate = useNavigate()
    
    useEffect (()=> {
        if(user) {
            navigate('/home')
        }
    
    },[user])
    return <>
    <div className='landingContainer'>
        <div className='gradientContainer'>
             <Header isAr={false}/>
            <div className="showContainer" id='banner'>
                <h1>أهلًا بك في عالم الكاليستينيكس</h1>
                <p>ابدأ رحلتك بأمان، <a href='/register'>انضم إلينا</a></p>
                <p>اعرف المزيد</p>
                <a className='arrowIcon' onClick={()=>scrollFunc('personal')}><FaArrowDown/></a>
            </div>  
        </div>
        <section id='personal'>
            <div className='quoteContainer'>
                <div className='personalImg'>
                    <img src="../assets/about/me3.jpg" alt="M.Alaa" />
                </div>
                <div  ref={ref} className={visible ? 'quoteDetailsA showCard' : 'quoteDetailsA'}>
                    <aside>
                        <h1>توفير تدريبات لذوي الارادة و تحفيز اللياقة البدنية</h1>
                        <p>السلام عليكم، أنا - محمد - مدربكم الجديد... وأنا -بإذن الله - متخصص في مجال التغذية الرياضية وتدريبات القوة واللياقة البدنية. بدأت رحلتي في 2015 بدون أي سابق خبرة.</p>
                    </aside>
                    <aside>
                        <h1>كيف بدأت ؟</h1>
                        <p>قضيت فترة ليست بقليلة في حيرة من أين أبدأ... لجأت إلى طرق عديدة للوصول إلى قمة لياقتي البدنية.</p>
                        <p>لكن الآن - بمساعدتي - لن تُترك أنت تعاني نفس حيرتي في مسار التحول إلى كامل لياقتك ومهاراتك البدنية و نظامك الغذائي. ولأننا مختلفون، فكل متدرب يحظى ببرنامج شخصي خصيصًا له يتناسب مع قدراته البدنية والاجتماعية.</p>
                    </aside>
                </div>
            </div>
        </section>
        <section id='features'>
            <div className='cardsContainer'>
                {memberships.map((value, index)=> <ImgMediaCard key={index} name={value.name} paragraph={value.details} src={`../assets/gallery/${value.img}`} />)}
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
                <Footer isAr={true}/>
        </footer>
    </div>
    </>
}