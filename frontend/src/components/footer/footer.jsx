import './footer.css'
import {FaFacebook, FaInstagram, FaYoutube, FaAngleDoubleUp} from "react-icons/fa";
import scrollFunc from '../utils/scrollFunc';


export default function Footer({isAr}) {
    return (
        <div className='footerContainer'>
            <div className='contactContainer'>
                <div className='contactSocial'>
                    {!isAr && <h1>Follow Us</h1>}
                    {isAr && <h1>تابعنا</h1>}
                    <div className='contactItem'>
                        <FaInstagram/>
                        <span><a href='https://www.instagram.com/calisthenicsengineer/?igshid=YmMyMTA2M2Y='>Instagram</a></span>
                    </div>
                    <div className='contactItem'>
                        <FaYoutube/>
                        <span><a href='https://www.youtube.com/channel/UCMVST9UMbwcVXA4DwXlGcOA'>Youtube</a></span>
                    </div>
                </div>
                {!isAr && <div className='about'>
                    <h1>About Us</h1>
                    <p>Calisthenics is a form of strength training consisting of a variety of movements that exercise large muscle groups (gross motor movements), such as standing, grasping, pushing, etc.</p>
                </div>}
                {isAr && <div className='about' style={{ textAlign: 'right'}}>
                    <h1>من نحن ؟ </h1>
                     <p> -الكاليستينيكس -هي شكل من أشكال تدريبات القوة البدنية التي تتكون من مجموعة متنوعة من الحركات التي تحفز عديد من المجموعات العضلية مثل الوقوف والضغط......</p>
                </div>}
        </div>
        <a onClick={()=> scrollFunc('banner')}><FaAngleDoubleUp/></a>
        <div className='copyright'>&copy; CopyRight </div>
    </div>
    )
}