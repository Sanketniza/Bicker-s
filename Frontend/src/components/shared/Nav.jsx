import { useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const menuItems = [
    { name: "BIKES", subMenu: ["Sports", "Cruiser", "Off-Road"] },
    { name: "SCOOTERS", subMenu: ["Electric", "Petrol", "Hybrid"] },
    { name: "ELECTRIC ZONE", subMenu: ["Bikes", "Scooters", "Charging Stations"] },
    { name: "BIKE FINANCE", subMenu: ["Loans", "EMI Calculator", "Offers"] },
    { name: "USED BIKES", subMenu: ["Buy", "Sell", "Exchange"] },
    { name: "NEWS & VIDEOS", subMenu: ["Latest News", "Reviews", "Videos"] },
  ];

  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#0F0F0F] to-[#0F0F0F] shadow-[0px_10px_10px_-5px_rgba(102,116,204,0.5)]">
      <nav className="flex items-center justify-center h-14 max-w-screen-xl px-5 mx-auto mb-0">
        {menuItems.map((item, index) => (
          <div key={index} className="relative group mx-4">
            <button 
              className="text-white font-semibold hover:text-blue-400"
              onMouseEnter={() => setOpenDropdown(index)}
            >
              {item.name} ▼
            </button>
            {openDropdown === index && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 mt-1 w-48 bg-gray-900 text-white shadow-lg rounded-md border border-gray-700 opacity-100 visible transition-opacity duration-300"
                onMouseEnter={() => setOpenDropdown(index)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <div className="rounded-t-lg bg-orange-500 p-2 text-center text-white font-bold">
                  {item.name}
                </div>
                {item.subMenu.map((subItem, subIndex) => (
                  <a
                    key={subIndex}
                    href="#"
                    className="block px-4 py-2 hover:bg-orange-600"
                  >
                    {subItem}
                  </a>
                ))}
              </motion.div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;
