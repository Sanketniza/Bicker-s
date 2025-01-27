import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel';
import LatestJobs from './LatestJobs';
import Footer from './shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


//&------------------------------------------------------------------------------------------

function Home() {
  useGetAllJobs();

  const {user} = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect (() => {
    if(user?.role === "hr") {
      navigate("/admin/companies")
    }
  });

  return (
    <>
      <Navbar />
      <HeroSection />
      <CategoryCarousel/>
      <LatestJobs/>
      <Footer/>
    </>
  )
};

export default Home;