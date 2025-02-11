import "../../css/Brand.css";
import b from '../../assets/Brand/bmd hd.png';
import a from '../../assets/Brand/a-removebg-preview.png';
import b1 from '../../assets/Brand/a-removebg-preview.png';
import b2 from '../../assets/Brand/tvs-removebg-preview.png';
import b3 from '../../assets/Brand/suzuki-removebg-preview.png';
import b4 from '../../assets/Brand/Rolay_Em-removebg-preview.png';
import b5 from '../../assets/Brand/Mahindra-removebg-preview.png';

import c1 from '../../assets/Brand/Mahindra-removebg-preview.png';
import c2 from '../../assets/Brand/Kia-removebg-preview.png';
import c3 from '../../assets/Brand/Honda-removebg-preview.png';
import c5 from '../../assets/Brand/BMW-removebg-preview.png';

import { useRef } from 'react';

const Companies = () => {
  const wrapperRef = useRef(null);

  const companies = [
    
    { id: 1, title: "Google", logo: a,  },
    { id: 2, title: "Microsoft", logo: b },
    { id: 3, title: "Apple", logo: b1 },
    { id: 4, title: "TVS", logo: b2 },
    { id: 5, title: "Suzuki", logo: b3 },
    { id: 6, title: "Rolay", logo: b4 },
    { id: 7, title: "Mahindra", logo: b5 },
    { id: 8, title: "Mahindra", logo: c1 },
    { id: 9, title: "Kia", logo: c2 },
    { id: 10, title: "Honda", logo: c3 },
    { id: 12, title: "BMW", logo: c5 },
    // Add more companies as needed
  ];

  const handleMouseMove = (e) => {

    const cards = wrapperRef.current?.querySelectorAll('.card');

    cards?.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const angle = (Math.atan2(mouseY - centerY, mouseX - centerX) * 180) / Math.PI;

      card.style.setProperty("--x", `${mouseX}px`);
      card.style.setProperty("--y", `${mouseY}px`);
      card.style.setProperty("--start", `${((angle + 360) % 360) + 60}`);
    });

  };

  return (

        <div className="mx-10 mb-10">

            <div className="border rounded-lg shadow-2xl border-emerald-500 max-w-7xl mx-auto">
                <h1 className='text-4xl font-bold flex items-start justify-start mt-8 pl-8'>
                <span className='text-[#6A38C2]'>Latest Top </span>&nbsp;
                Popular Brands
                </h1>

                <div 
                className="card-glow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-2 justify-items-center"
                ref={wrapperRef}
                onMouseMove={handleMouseMove}
                >
                    {
                        companies.map((company) => (

                            <div key={company.id} className="card relative flex flex-col items-center">

                                <div className="glow absolute inset-0"></div>
                                <h1 className="text-6xl font-bold text-gray-500 z-10">{company.id.toString().padStart(2, '0')}</h1>

                                <div className="flex-1 flex items-center justify-center w-full">
                                    <img 
                                    src={company.logo} 
                                    alt={company.title}
                                    className="w-32 h-32 object-contain mx-auto my-4 z-10"
                                    />
                                </div>

                                <div className="w-full text-center mb-6 z-10">
                                    <p className="text-xl font-semibold text-white">{company.title}</p>
                                </div>

                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    );
};

export default Companies;