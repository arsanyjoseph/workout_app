import Header from '../components/header'
import './css/landingPage2.css'
import { FaArrowDown } from "react-icons/fa";


export default function landingPage2 () {
    return <div className='landingContainer'>
        <div className='gradientContainer'>
            <Header/>
            <div className="showContainer">
                <h1>Hello World</h1>
                <p>You are Welcome to <a href='/login'>Join Us</a></p>
                <p>Explore More</p>
                <a className='arrowIcon' href='#'><FaArrowDown/></a>
            </div> 
            <section>
                
            </section>   
        </div>
    </div>
}