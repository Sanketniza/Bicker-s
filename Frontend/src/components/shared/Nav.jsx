import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "BIKES", subMenu: ["Sports", "Cruiser", "Off-Road"] },
    { name: "SCOOTERS", subMenu: ["All", "Petrol", "Hybrid"] },
    { name: "ELECTRIC ZONE", subMenu: ["Bikes", "Scooters", "Charging Stations"] },
    { name: "BIKE FINANCE", subMenu: ["Loans", "EMI Calculator", "Offers"] },
    { name: "USED BIKES", subMenu: ["Buy", "Sell", "Exchange"] },
    { name: "NEWS & VIDEOS", subMenu: ["Latest News", "Reviews", "Videos"] },
  ];

  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let closeTimeout;

  const handleMouseEnter = (index) => {
    clearTimeout(closeTimeout); // Clear timeout to prevent accidental closing
    setOpenDropdown(index);
  };

  const handleMouseLeave = () => {
    closeTimeout = setTimeout(() => {
      setOpenDropdown(null);
    }, 100); // Small delay to avoid accidental closing
  };
  const getNavigationPath = (subItem) => {
    // Special case for "Sports" to navigate to electric-zone
    if (subItem === "Sports") {
      return "/bike-zone";
    }

    if (subItem === "All") {
      return "/scooter-zone";
    }
    if (subItem === "Bikes") {
      return "/electric-zone";
    }
    // Default behavior for other items
    return `/${subItem.toLowerCase().replace(/ /g, '-')}`;
  };

  const handleSubMenuClick = (subItem) => {
    navigate(getNavigationPath(subItem));
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#0F0F0F] to-[#0F0F0F] shadow-[0px_10px_10px_-5px_rgba(102,116,204,0.5)]">
      <nav className="flex items-center justify-between h-14 max-w-screen-xl px-5 mx-auto mb-0">
        <div className="flex items-center lg:hidden">
          <Link to="/" className="text-white font-semibold hover:text-blue-400">
            Home
          </Link>
        </div>

        <div className="hidden lg:flex items-center">
          {menuItems.map((item, index) => (
            <div 
              key={index} 
              className="relative group mx-4"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <button className="text-white font-semibold hover:text-blue-400">
                {item.name} ▼
              </button>   
              {openDropdown === index && (                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 mt-1 w-48 bg-gray-900 text-white shadow-lg rounded-md border border-gray-700"
                >
                  <div className="rounded-t-lg bg-orange-500 p-2 text-center text-white font-bold">
                    {item.name}
                  </div>
                  {item.subMenu.map((subItem, subIndex) => (
                    <Link 
                      to={getNavigationPath(subItem)} 
                      key={subIndex} 
                      className="block px-4 py-2 hover:bg-orange-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {subItem}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Toggle button for small and medium screens */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile and medium menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#0F0F0F] border-t border-[#7c5a36]">
          <motion.ul className="flex flex-col items-center gap-4 py-4">
            {menuItems.map((item, index) => (
              <div key={index} className="relative group mx-4">
                <button 
                  className="text-white font-semibold hover:text-blue-400"
                  onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                >
                  {item.name} ▼
                </button>
                {openDropdown === index && (                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-1 w-48 bg-gray-900 text-white shadow-lg rounded-md border border-gray-700"
                  >
                    <div className="rounded-t-lg bg-orange-500 p-2 text-center text-white font-bold">
                      {item.name}
                    </div>
                    {item.subMenu.map((subItem, subIndex) => (
                      <Link 
                        to={getNavigationPath(subItem)} 
                        key={subIndex} 
                        className="block px-4 py-2 hover:bg-orange-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subItem}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </motion.ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;

