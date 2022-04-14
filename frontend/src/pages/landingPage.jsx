import Carousel from '../components/carousel'
import Header from '../components/header'
import './css/landingPage.css'

export default function LandingPage () {
    return (
        <div className="mainPageContainer">
            <Header/>
            <Carousel/>
        </div>
    )
}