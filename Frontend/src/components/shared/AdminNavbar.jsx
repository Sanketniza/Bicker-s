import { useState } from 'react';
import '../../css/LogoName.css';
import logo from '../../assets/photo/logo.png';
import { motion } from "motion/react";
import { Bike, HardHat, Home, ListOrdered, Menu, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {  User, LogOut, Package, Settings } from 'lucide-react';
import { ModeToggle } from './mode-toggle'; // Import ModeToggle component
import {USER_API_END_POINT } from '@/utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { setUser } from '../../store/authSlice';
import { clearWishList } from '@/store/wishListSlice';
import {  OpenInBrowserRounded } from '@mui/icons-material';

function AdminNavbar() {

  const {user} = useSelector((state) => state.auth);  
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const handleLogin = () => {
    navigate('/login');
  };


  const profile = () => {
    navigate('/profile');
  };

  const logoutHandler = async () => {
    

    try{
        //* --> This is used to logout the shopOwner.
        const res = await axios.get(`${USER_API_END_POINT}/logout` , {
            withCredentials: true
        });

            if(res.data.success) {
                dispatch(setUser(null));
                dispatch(clearWishList());
                navigate("/login");
                toast.success(res.data.message, {
                    style: {
                        color: '#10B981',
                        backgroundColor: '#09090B',
                        fontSize: '20px',
                        borderColor: '#10B981',
                        padding: '10px 20px'
                    }
                });
            }
            
    }catch(error){
        // console.log(error)
        toast.error(error.response.data.message, "admin", {
            style: {
                color: '#f44336',
                backgroundColor: '#fff',
                fontSize: '16px',
                borderColor: '#f44336',
                padding: '10px 20px'
            }
        });
    }
}

  return (
            <>
        
            <div className="sticky top-0 z-50 w-full h-16 bg-gradient-to-r from-[#0F0F0F] to-[#0F0F0F] rounded-b-lg border-b-4 border-[#7c5a36] shadow-lg">
            <div className='flex items-center justify-between h-16 max-w-screen-xl px-5 mx-auto mb-5'>

                <div className="flex items-center">
                <div className="flex">
                    <Link to="/admin">
                    <img className="w-16 h-16 bg-transparent rounded-md" src={logo} alt="logo" />
                    </Link>
                </div>
                <h1 className="mx-5 text-3xl font-bold text-white-800 hidden sm:block">
                    <Link to="/admin" className="flex items-center gap-1">
                    <Link to="/admin" className="btn-shine text-red-500">Biker&apos;s</Link>
                    </Link>
                </h1>
                </div>


                
						
						


                <div className="hidden lg:flex items-center justify-between">
                <motion.ul className="flex items-center gap-10">
                    <motion.li
                        whileHover={{ color: "#6674CC" }}
                        transition={{ delay: 0.011 }}
                        className="cursor-pointer text-white-800"
                    >
                            <NavLink 
                                to="/admin"
                                className={({isActive}) => (isActive ? "text-yellow-500" : "text-white-800")}
                            >
                                <div className="flex items-center gap-1">
                                <Home className="w-5 h-5" />
                                <span>Home</span>
                                </div>
                            </NavLink>
                    </motion.li>

                    <motion.li
                        whileHover={{ color: "#6674CC" }}
                        transition={{ delay: 0.011 }}
                        className="cursor-pointer text-white-800"
                    >
                            <NavLink 
                                to="/admin-companies"
                                className={({isActive}) => (isActive ? "text-red-500" : "text-white-800")}
                            >
                                <div className="flex items-center gap-1">
                                <OpenInBrowserRounded className="w-5 h-5" />
                                <span>Companies</span>
                                </div>
                            </NavLink>
                        </motion.li>

                    <motion.li
                    whileHover={{ color: "#6674CC" }}
                    className="cursor-pointer text-white-800">
                    <NavLink 
                        to="/admin-order"
                        className={({isActive}) => (isActive ? "text-red-500" : "text-white-800")}
                    >  
                        <div className="flex items-center gap-1">
                        <ListOrdered className="w-5 h-5" />
                        <span>OrderList</span>
                        </div>
                    </NavLink>
                    </motion.li>
                    <motion.li
                    whileHover={{ color: "#6674CC" }}
                    transition={{ delay: 0.011 }}
                    className="mr-[90px] cursor-pointer text-white-800 md:text-lg">
                    <NavLink 
                        to="/admin-products"
                        className={({isActive}) => (isActive ? "text-red-500" : "text-white-800")}
                    >  
                        <div className="flex items-center gap-1">
                        <HardHat className="w-5 h-5" />
                        <span>Products </span>
                        </div>
                    </NavLink>
                    </motion.li>
                </motion.ul>
                </div>

                <div className="flex items-center gap-4">
                <ModeToggle /> {/* Add ModeToggle component here */}

                {
                    user && user.role == "shopOwner" ? (
                    <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                        <SheetTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-12 rounded-full">
                            <Avatar>
                            <AvatarImage src={user.email} alt={user.fullname} />
                            <AvatarFallback className="border-2 border-[#10B981]" >{user.fullname[0]}</AvatarFallback>
                            </Avatar>
                        </Button>
                        </SheetTrigger>
                        <SheetContent 
                        className="w-[500px]"
                        style={{
                            background: `radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.09), transparent 80%)`
                        }}
                        >
                        <SheetHeader>
                            <SheetTitle className="text-2xl font-semibold text-orange-500">Profile</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6 space-y-6">
                            <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16  border-2 border-[#10B981] rounded-full">
                                <AvatarImage src={user.avatar} alt={user.fullname} />
                                <AvatarFallback>{user.fullname[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-semibold">{user.fullname}</h3>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                            </div>
                            <div className="space-y-2">
                            <Button 
                                variant="ghost" 
                                className="w-full justify-start hover:bg-red-100/10" 
                                onClick={profile}
                            >
                                <User className="mr-2 h-4 w-4" />
                                View Profile
                            </Button>
                            <Button 
                                variant="ghost" 
                                className="w-full justify-start hover:bg-red-100/10"
                                onClick={() => navigate('/admin-order')}
                            >
                                <Package className="mr-2 h-4 w-4" />
                                Orders History
                            </Button>
                            <Button 
                                variant="ghost" 
                                className="w-full justify-start hover:bg-red-100/10"
                                onClick={() => navigate('/settings')}
                            >
                                <Settings className="mr-2 h-4 w-4" />
                                Settings
                            </Button>
                            <Button 
                                variant="ghost" 
                                className="w-full justify-start hover:bg-red-100/10"
                                onClick={() => navigate('/admin-notification')}
                            >
                                <Settings className="mr-2 h-4 w-4" />
                                Notification
                            </Button>
                            <Button 
                                variant="ghost" 
                                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100/10"
                                onClick={logoutHandler}
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </Button>
                            </div>
                            {/* {
                                shopOwner.orders.length > 0 && (
                                    <div className="border-t pt-4">
                                    <h4 className="mb-4 text-md font-medium text-orange-800">Recent Orders</h4>
                                    <div className="space-y-3">
                                        {
                                        shopOwner.orders.map(order => (
                                            <motion.div
                                            key={order.id}
                                            className="rounded-lg border p-3 border-1 border-[#10B981] "
                                            whileHover={{ scale: 1.02 }}
                                            >
                                            <div className="flex justify-between items-center">
                                                <p className="font-medium">{order.bike}</p>
                                                <p className="text-sm text-muted-foreground">{order.date}</p>
                                            </div>
                                            </motion.div>
                                        ))
                                        }
                                    </div>
                                    </div>
                                )
                            } */}
                        </div>
                        </SheetContent>
                    </Sheet>
                    ) : (
                    <Button
                        variant="default"
                        onClick={handleLogin}
                        className="flex items-center"
                    >
                        <User className="h-4 w-4" />
                        Login
                    </Button>
                    )
                }

                {/* Toggle button for small and medium screens */}
                <Button
                    variant="ghost"
                    className="lg:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
                </div>
                
            </div>

                                


            {/* Mobile and medium menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-[#0F0F0F] border-t border-[#7c5a36]">
                <motion.ul className="flex flex-col items-center gap-4 py-4">
                    <motion.li
                    whileHover={{ color: "#6674CC" }}
                    transition={{ delay: 0.011 }}
                    className="cursor-pointer text-white-800">
                    <NavLink 
                        to="/admin"
                        className={({isActive}) => (isActive ? "text-red-500" : "text-white-800")}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <div className="flex items-center gap-1">
                        <Bike className="w-5 h-5" />
                        <span>Home</span>
                        </div>
                    </NavLink>
                    </motion.li>

                    <motion.li
                    whileHover={{ color: "#6674CC" }}
                    transition={{ delay: 0.011 }}
                    className="cursor-pointer text-white-800">
                    <NavLink 
                        to="/admin-companies"
                        className={({isActive}) => (isActive ? "text-red-500" : "text-white-800")}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <div className="flex items-center gap-1">
                        <Bike className="w-5 h-5" />
                        <span>Companies</span>
                        </div>
                    </NavLink>
                    </motion.li>

                    <motion.li
                    whileHover={{ color: "#6674CC" }}
                    className="cursor-pointer text-white-800">
                    <NavLink 
                        to="/admin-order"
                        className={({isActive}) => (isActive ? "text-red-500" : "text-white-800")}
                        onClick={() => setIsMenuOpen(false)}
                    >  
                        <div className="flex items-center gap-1">
                        <ListOrdered className="w-5 h-5" />
                        <span>OrderList</span>
                        </div>
                    </NavLink>
                    </motion.li>

                    <motion.li
                        whileHover={{ color: "#6674CC" }}
                        transition={{ delay: 0.011 }}
                        className="cursor-pointer text-white-800">
                    <NavLink 
                        to="/admin-products"
                        className={({isActive}) => (isActive ? "text-red-500" : "text-white-800")}
                        onClick={() => setIsMenuOpen(false)}
                    >  
                        <div className="flex items-center gap-1">
                        <HardHat className="w-5 h-5" />
                        <span>Products </span>
                        </div>
                    </NavLink>
                    </motion.li>
                </motion.ul>
                </div>
            )}


            </div>
        </>
    );
}

export default AdminNavbar;