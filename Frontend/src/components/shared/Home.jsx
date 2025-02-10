import Navbar from '../shared/Navbar';
import Nav from '../shared/Nav';
import Ad from '../Home/Ad';
import Brand from '../Home/Brand';

// ----------------------------------------------
// import { Switch, Route } from "wouter";
// import { queryClient } from "../../lib/queryClient"; // Corrected import path
// import { QueryClientProvider } from "@tanstack/react-query";
// import { Toaster } from "@/components/ui/toaster";
// import NotFound from "@/pages/not-found";
// import CompaniesPage from "../Home/Bikes";

import BikesSpotlight from "../Home/Bikes";
import BikeDetails from "../../components/Home/Bikes/bike-details";
import { Route } from 'wouter';


// ----------------------------------------------------------------

function Home() {

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
      <Navbar />
      <Nav />
      <Ad />
      <BikesSpotlight />
    
      {/* <Route path="/bike/:id" component={BikeDetails}/> */}
      <Brand />


      {/* <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
      </QueryClientProvider> */}

    </>
  );
}

export default Home;