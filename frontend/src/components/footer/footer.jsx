import './footer.css'
import {FaFacebook, FaInstagram, FaYoutube, FaAngleDoubleUp} from "react-icons/fa";
import scrollFunc from '../utils/scrollFunc';


export default function Footer() {
    return (
        <div className='footerContainer'>
            <div className='contactContainer'>
                <div className='contactSocial'>
                    <h1>WorkOut App</h1>
                    
                    <div className='contactItem'>
                        <FaInstagram/>
                        <span>Instagram /</span>
                    </div>
                    <div className='contactItem'>
                        <FaYoutube/>
                        <span>Youtube /</span>
                    </div>
                </div>
                <div className='about'>
                    <h1>About Us</h1>
                    <p>Calisthenics is a form of strength training consisting of a variety of movements that exercise large muscle groups (gross motor movements), such as standing, grasping, pushing, etc.</p>
                </div>
        </div>
        <a onClick={()=> scrollFunc('banner')}><FaAngleDoubleUp/></a>
        <div className='copyright'>&copy; CopyRight </div>
    </div>
    )
}