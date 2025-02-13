
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Edit2, Save } from 'lucide-react';
import Navbar from '../shared/Navbar';
import { SheetTrigger } from '../ui/sheet';
import { Avatar } from 'antd';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

export default function Profile() {

  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    address: '123 Bike Street, Motor City, MC 12345',
    bio: 'Passionate about motorcycles and adventure riding. Been riding for over 10 years and love exploring new trails.',
    socialMedia: {
      facebook: 'facebook.com/johndoe',
      twitter: 'twitter.com/johndoe',
      instagram: 'instagram.com/johndoe',
      linkedin: 'linkedin.com/in/johndoe'
    },
    paymentInfo: {
      cardType: 'Visa',
      lastFour: '4242'
    }
  });

  const handleSave = () => {
    setIsEditing(false);
  };



  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
        <>
            <Navbar />

            <div className=" ">
                <div className="mx-10">
                    <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative p-10 mx-auto my-20 border rounded-lg shadow-2xl border-emerald-500/30 max-w-4xl bg-black/20 backdrop-blur-sm"
                    >
                    {/* Glow effect */}
                    <div 
                        className="absolute inset-0 rounded-lg opacity-30 blur-xl"
                        style={{
                        background: `radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.3), transparent 80%)`
                        }}
                    />
                    <div className="relative flex justify-between items-center mb-8">
                        
                        <h1 className="text-4xl font-bold text-white">
                          <span className="text-emerald-500">My</span> Profile
                        </h1>
                        <Button onClick={handleEdit} variant="outline" className="gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border-emerald-500/30">
                            {isEditing ? <Save className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
                            {isEditing ? 'Save Changes' : 'Edit Profile'}
                        </Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-emerald-500">Name</label>
                            <Input 
                            value={userData.name}
                            disabled={!isEditing}
                            className="mt-1 bg-white/5 border-emerald-500/30 text-white focus:border-emerald-500 focus:ring-emerald-500/20"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-[#F97316]">Email</label>
                            <Input 
                            value={userData.email}
                            disabled={!isEditing}
                            className="mt-1 bg-white/5 border-emerald-500/30 text-white focus:border-emerald-500 focus:ring-emerald-500/20"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-[#F97316]">Phone</label>
                            <Input 
                            value={userData.phone}
                            disabled={!isEditing}
                            className="mt-1 bg-white/5 border-emerald-500/30 text-white focus:border-emerald-500 focus:ring-emerald-500/20"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-[#F97316]">Address</label>
                            <Input 
                            value={userData.address}
                            disabled={!isEditing}
                            className="mt-1 bg-white/5 border-emerald-500/30 text-white focus:border-emerald-500 focus:ring-emerald-500/20"
                            />
                        </div>
                        </div>

                        <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-[#F97316]">Bio</label>
                            <Textarea 
                            value={userData.bio}
                            disabled={!isEditing}
                            className="mt-1 h-32  bg-white/5 border-emerald-500/30 text-white focus:border-emerald-500 focus:ring-emerald-500/20"
                            />
                        </div>

                        <div className="bg-emerald-500/5 p-4 rounded-lg border border-emerald-500/30">
                            <label className="text-sm font-medium text-emerald-500">Payment Information</label>
                            <div className="mt-1 p-3 bg-black/20 rounded-lg text-white">
                            <p>{userData.paymentInfo.cardType} **** {userData.paymentInfo.lastFour}</p>
                            </div>
                        </div>

                        <div className="bg-emerald-500/5 p-4 rounded-lg border border-emerald-500/30">
                            <label className="text-sm font-medium text-emerald-500">Social Media</label>
                            <div className="mt-2 flex gap-4">
                            <a href={userData.socialMedia.facebook} className="text-blue-600 hover:text-blue-700">
                                <Facebook />
                            </a>
                            <a href={userData.socialMedia.twitter} className="text-sky-500 hover:text-sky-600">
                                <Twitter />
                            </a>
                            <a href={userData.socialMedia.instagram} className="text-pink-600 hover:text-pink-700">
                                <Instagram />
                            </a>
                            <a href={userData.socialMedia.linkedin} className="text-blue-700 hover:text-blue-800">
                                <Linkedin />
                            </a>
                            </div>
                        </div>
                        </div>
                    </div>
                    </motion.div>
                </div>
            </div>
        </>    
    );
}

    