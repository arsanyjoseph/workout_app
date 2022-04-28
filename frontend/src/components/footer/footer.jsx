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
                        <FaFacebook/>
                        <span>Facebook /</span>
                    </div>
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
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia illo fugit dolores at voluptate a culpa, magni odio tempora autem!</p>
                </div>
        </div>
        <a onClick={()=> scrollFunc('banner')}><FaAngleDoubleUp/></a>
        <div className='copyright'>&copy; CopyRight </div>
    </div>
    )
}