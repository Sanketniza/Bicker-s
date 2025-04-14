import { useEffect, useState } from "react";
import Footer from "../shared/footer"

import { motion , useScroll} from 'framer-motion';

import AdminNavbar from "../shared/AdminNavbar";
import AdminCompaniesCreation from "./AdminCompaniesCreation";


function AdminHome() {

     const [isLoading, setIsLoading] = useState(true);
    
      useEffect(() => {
        
        window.scrollTo(0, 0);

        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 1500);
    
        return () => clearTimeout(timer);
      }, []);
    
        const scroll = useScroll().scrollYProgress
        console.log(scroll)

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
            >

                <AdminNavbar />
                <AdminCompaniesCreation />
                <Footer />
             </motion.div>
        </>
    )
}

export default AdminHome