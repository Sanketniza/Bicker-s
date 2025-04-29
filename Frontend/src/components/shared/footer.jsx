
import { Facebook, Instagram, Twitter, Mail, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {

  const socialLinks = [
    { icon: Facebook, href: '#', color: '#1877F2' },
    { icon: Instagram, href: '#', color: '#E4405F' },
    { icon: Twitter, href: '#', color: '#1DA1F2' },
    { icon: Mail, href: '#', color: '#EA4335' },
    { icon: Linkedin, href: '#', color: '#0A66C2' },
  ];

  return (
        <footer className="mt-auto py-8 bg-black/40 border-t border-emerald-500/30 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-emerald-500">Biker's</h3>
                        <h5 className="text-gray-400">
                        Find your perfect ride with our extensive collection of motorcycles.
                        </h5>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Quick Links</h4>
                        <ul className="space-y-2">
                        <li><a href="/" className="text-gray-400 hover:text-emerald-500 transition-colors">Home</a></li>
                        <li><a href="/favorites" className="text-gray-400 hover:text-emerald-500 transition-colors">Favorites</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">About Us</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Connect With Us</h4>
                        <div className="flex flex-wrap gap-4">
                        {socialLinks.map((social, index) => (
                            <motion.a
                            key={index}
                            href={social.href}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            >
                            <social.icon
                                className="w-5 h-5"
                                style={{ color: social.color }}
                            />
                            </motion.a> 
                        ))}
                        </div>
                    </div>

                </div>

                <div className="mt-8 pt-8 border-t border-white/10 text-center">
                <p className="text-[#F97316]">
                    © {new Date().getFullYear()} BikeHub. All rights reserved.
                </p>
                </div>
                
            </div>
        </footer>
    );
}

export default Footer;
