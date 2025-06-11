import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState } from 'react';
import { ImageSlider } from './ImageSlider';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

export function CompanyCard({ id: companyId, name, images = [], price }) {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

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
    }    return (
        <motion.div
            className="relative w-full max-w-[290px]"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1000 }}
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

                {/* ✅ Image Slider with Fallback */}
                <Link to={`/description/${companyId}`}>
                    {images.length > 0 ? (
                        <ImageSlider images={images} className="h-40" />
                    ) : (
                        <div className="h-40 flex items-center justify-center bg-gray-800 text-gray-400">
                            No Images Available
                        </div>
                    )}
                </Link>                {/* Card content */}
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                    <h2 className="text-lg sm:text-xl font-semibold text-foreground text-center line-clamp-2">{name}</h2>
                    
                    {/* ✅ Handle undefined price */}
                    {price !== undefined ? (
                        <p className="text-xl sm:text-2xl font-bold text-center text-emerald-500">
                            ₹{price.toLocaleString()}
                        </p>
                    ) : (
                        <p className="text-xl sm:text-2xl font-bold text-center text-gray-500">
                            Price Not Available
                        </p>
                    )}

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
                        onClick={() => navigate(`/description/${companyId}`)}
                    >
                        View Details
                    </motion.button>
                </div>

                {/* Hover overlay */}
                <motion.div
                    className="absolute inset-0 bg-primary/5 rounded-lg pointer-events-none"
                    style={{
                        opacity: useTransform(rotateX, [-30, 0, 30], [0.2, 0, 0.2]),
                        transformStyle: "preserve-3d",
                    }}
                />
            </motion.div>
        </motion.div>
    );
}

CompanyCard.propTypes = {
    id: PropTypes.string, // Changed from number to string for MongoDB _id
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    images: PropTypes.array, // Allow any array format
};;

CompanyCard.defaultProps = {
    images: [], // ✅ Fallback value for images
};
