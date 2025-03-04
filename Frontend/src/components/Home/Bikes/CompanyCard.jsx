import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState } from 'react';
import { ImageSlider } from './ImageSlider';

import { useLocation } from 'wouter';
import { useNavigate } from 'react-router-dom';


export function CompanyCard({ id, name, images, price }) {

  const [isHovered, setIsHovered] = useState(false);
  // const [, setLocation] = useLocation();
  const navigate = useNavigate();

  // const handleViewDetails = () => {
  //   navigation(`/bike/${id}`);
  // };



  // Motion values for 3D rotation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation for rotation
  const rotateX = useSpring(useTransform(y, [-100, 100], [30, -30]), {
    stiffness: 100,
    damping: 30
  });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-30, 30]), {
    stiffness: 100,
    damping: 30
  });

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }

  
  // const handleViewDetails = () => {
  //   setLocation(`/bike/${id}`);
  // };

  

  return (

        <motion.div
            className="relative w-[290px]"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 1000,
            }}
        >
            <motion.div
                className="w-full rounded-lg bg-card border-2 border-zinc-800 overflow-hidden"
                style={{
                rotateX: rotateX,
                rotateY: rotateY,
                transformStyle: "preserve-3d",
                }}
            >
                {/* macOS window controls */}
                <div className="tools p-3 border-b border-orange-500 mb-1">
                    <div className="flex gap-2">
                        <div className="circle">
                        <span className="box bg-[#ff605c] block w-3 h-3 rounded-full"></span>
                        </div>

                        <div className="circle">
                        <span className="box bg-[#ffbd44] block w-3 h-3 rounded-full"></span>
                        </div>

                        <div className="circle">
                        <span className="box bg-[#00ca4e] block w-3 h-3 rounded-full"></span>
                        </div>
                    </div>
                </div>

                {/* Image Slider */}
                <ImageSlider images={images} />

                {/* Card content */}
                <div className="p-6 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground text-center">{name}</h2>
                    <p className="text-2xl font-bold text-center text-emerald-500">
                        ${price.toLocaleString()}
                    </p>

                    {/* Animated View Button */}
                    <motion.button
                        className="w-full py-2 px-4 bg-emerald-500 text-white rounded-md font-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                        }}
                        onClick={() => navigate(`/description/${id}`)}
                    >
                        View Details
                    </motion.button>
                </div>

                {/* Hover overlay */}
                <motion.div
                    className="absolute inset-0 bg-primary/5 rounded-lg pointer-events-none"
                    style={{
                        opacity: useTransform(
                        rotateX,
                        [-30, 0, 30],
                        [0.2, 0, 0.2]
                        ),
                        transformStyle: "preserve-3d",
                    }}
                />
            </motion.div>
        </motion.div>
    );
}
