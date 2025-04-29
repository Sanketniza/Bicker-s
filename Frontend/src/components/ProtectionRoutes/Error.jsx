import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white px-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">404</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-pink-600 mx-auto mb-6"></div>
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Page Not Found</h2>
          <p className="text-gray-300 text-lg mb-8">
            Oops! The page you are looking for doesn't seem to exist.
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <button 
            onClick={() => navigate('/')}
            className="px-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full font-medium text-white shadow-lg transition-all duration-300 transform"
          >
            Return to Home
          </button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-12"
        >
          <div className="relative w-64 h-64 mx-auto">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path 
                  fill="rgba(123, 31, 162, 0.5)" 
                  d="M44.7,-76.2C59.9,-69.2,75.1,-60.1,83.1,-46.3C91.1,-32.4,92,-13.8,88.9,3.7C85.8,21.2,78.7,37.8,68,50.8C57.4,63.9,43.2,73.5,27.7,79.5C12.2,85.6,-4.6,88,-19.9,84.1C-35.2,80.1,-49.1,69.8,-60.1,57.1C-71.2,44.4,-79.4,29.3,-82.8,12.8C-86.2,-3.6,-84.7,-21.4,-78.1,-37.1C-71.5,-52.8,-59.9,-66.4,-45.6,-73.7C-31.3,-80.9,-15.6,-81.8,0.3,-82.4C16.3,-83,32.5,-83.3,44.7,-76.2Z" 
                  transform="translate(100 100)" 
                />
              </svg>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 text-pink-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 text-gray-400 text-sm"
      >
        © {new Date().getFullYear()} Bicker's | All rights reserved
      </motion.div>
    </div>
  );
};

export default Error;