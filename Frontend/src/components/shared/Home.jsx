
import Navbar from '../shared/Navbar';
import Nav from '../shared/Nav';
import Ad from '../Home/Ad';
import BikesSpotlight from '../Home/Bikes';
import Brand from '../Home/Brand';
function Home() {
    return (

        <>

           <Navbar />
           <Nav />

           <Ad />

           {/* <BikesSpotlight /> */}

           <Brand />
        </>
    )
} 

export default Home