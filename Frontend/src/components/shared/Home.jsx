import Navbar from '../shared/Navbar';
import Nav from '../shared/Nav';
import Ad from '../Home/Ad';
import Brand from '../Home/Brand';
import { motion , useScroll} from 'framer-motion';

// ----------------------------------------------
// import { Switch, Route } from "wouter";
// import { queryClient } from "../../lib/queryClient"; // Corrected import path
// import { QueryClientProvider } from "@tanstack/react-query";
// import { Toaster } from "@/components/ui/toaster";
// import NotFound from "@/pages/not-found";
// import CompaniesPage from "../Home/Bikes";

import BikesSpotlight from "../Home/Bikes";
// import BikeDetails from "../../components/Home/Bikes/bike-details";
// import { Route } from 'wouter';
import Footer from './footer';


// ----------------------------------------------------------------

function Home() {

    const scroll = useScroll().scrollYProgress
    console.log(scroll)

//   function Router() {
//     return (
//       <Switch>
//         {/* Add pages below */}
//         <Route path="/" component={CompaniesPage}/>
//         {/* Fallback to 404 */}
//         <Route component={NotFound} />
//       </Switch>
//     );
//   }

  return (

        <>

           



           

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >

                <Navbar />
                <Nav />
                <Ad />
              
                <BikesSpotlight />
                <BikesSpotlight />
                <BikesSpotlight />
                
                {/* <Route path="/bike/:id" component={BikeDetails}/> */}

                <Brand />
                <Footer />
            </motion.div>

          
                {/* <QueryClientProvider client={queryClient}>
                    <Router />
                    <Toaster />
                </QueryClientProvider> */}

        </>
    );
}

export default Home;