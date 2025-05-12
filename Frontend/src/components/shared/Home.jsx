import Navbar from '../shared/Navbar';
import Nav from '../shared/Nav';
import Ad from '../Home/Ad';
import Brand from '../Home/Brand';
import { motion , useScroll} from 'framer-motion';
import { useState, useEffect } from "react";
import { LoadingScreen } from "../ui/loading";

// ----------------------------------------------
// import { Switch, Route } from "wouter";
// import { queryClient } from "../../lib/queryClient"; // Corrected import path
// import { QueryClientProvider } from "@tanstack/react-query";
// import { Toaster } from "@/components/ui/toaster";
// import NotFound from "@/pages/not-found";
// import CompaniesPage from "../Home/Bikes";

import BikesSpotlight from "../Home/Bikes";
import Electric from "../Home/Electric";
import Scooter from "../Home/Scooter";
import Car from "../Home/Car";

import Footer from './footer';


// ----------------------------------------------------------------

function Home() {

    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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

           
            {/* <div className="">
                    {
                        isLoading ? (
                        <LoadingScreen />

                        ) : (    */}
                        <>
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 1 }}
                            >

                                <Navbar />
                                <Nav />
                                <Ad />
                            
                                <BikesSpotlight />
                                <Electric />
                                <Scooter />
                                <Car />
                                
                                {/* <Route path="/bike/:id" component={BikeDetails}/> */}

                                <Brand />
                                <Footer />
                            </motion.div>
                        </>
                    {/* )}
            </div> */}


           
                    
         

          
                {/* <QueryClientProvider client={queryClient}>
                    <Router />
                    <Toaster />
                </QueryClientProvider> */}

        </>
    );
}

export default Home;