import '../../App.css';

import google from '../../assets/icons/google.png';
import userr from '../../assets/icons/user.png';
import eemail from '../../assets/icons/email (1).png';
import ppassword from '../../assets/icons/pass.png';
import pphone from '../../assets/icons/phone.png';
import aaddress from '../../assets/icons/location.png';

// import cycle from '../../assets/icons/cycling.gif';
import { motion } from "motion/react";
import {Link, useNavigate}  from 'react-router-dom';
import Navbar from './Navbar';
import { Input } from '../ui/input';
import { Label, RadioGroup } from '@radix-ui/react-dropdown-menu';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/api';
import { setError, setLoading, setUser } from '@/store/authSlice';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

function SignUp() {
    const [input, setInput] = useState({
      fullname: "",
      email: "",
      password: "",
      phone: "",
      role: "user",
    });
  
    const { loading, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };
  
    const submitHandler = async (e) => {

        e.preventDefault();
    
        // Log the input data to debug
        // console.log("Form Data:", input);
    
        try {

            dispatch(setLoading(true));
    
            const response = await axios.post("http://localhost:8000/api/v1/user/register",input, // Send input directly as JSON
                {
                    headers: {
                    "Content-Type": "application/json", // Set to JSON
                    },
                    withCredentials: true,
                }
            );
    
            if (response.data.success) {
                //dispatch(setUser(response.data.user)); // Use 'user' as per backend response
                navigate("/login");
                toast.success(response.data.message, {
                    style: {
                    color: "#10B981",
                    backgroundColor: "#09090B",
                    fontSize: "20px",
                    borderColor: "#10B981",
                    padding: "10px 20px",
                    },
                });
            } 
            
            else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.error("Error:", error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            dispatch(setLoading(false));
        }
    };
    
    useEffect(() => {
      if (user) {
        navigate("/");
      }
    }, []);

    return (
        <>

            <div>
                
                <Navbar />

                <div className="flex items-center justify-center min-h-screen px-3 text-white md:px-0">
                    <div className="flex flex-col items-center space-x-10 md:flex-row md:items-start md:space-y-5 md:space-x-5 ">
                        
                        <div className="space-y-5 p-12 md:mr-6 ">
                            
                            <motion.div 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col items-start space-y-2 pl-3 pr-6 py-3 w-[90vw] max-w-[400px] h-[120px] border border-transparent rounded-lg bg-[#0D0D0D] hover:border-t-[#F6B445] hover:border-l-[#F6B445] hover:border-b-transparent hover:border-r-transparent cursor-pointer"
                            >
                                <motion.div 
                                    className="p-3 bg-[#F6B445] rounded-full"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-6 8h6m-6 4h6m-6 4h6m-6-8h6m-6 4h6m-6 4h6"></path>
                                    </svg>
                                    
                                </motion.div>
                                <div className="mt-2">
                                    <h3 className="text-lg font-semibold text-[#F6B445]">Find amazing deals on top brands.</h3>
                                </div>
                            </motion.div>
                            
                            <motion.div 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col items-start space-y-2 pl-3 pr-6 py-3 w-[90vw] max-w-[400px] h-[120px] border border-transparent rounded-lg bg-[#0D0D0D] hover:border-t-[#00ccff] hover:border-l-[#00ccff] hover:border-b-transparent hover:border-r-transparent cursor-pointer"
                            >
                                <motion.div 
                                    className="p-3 bg-[#00ccff] rounded-full"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-6 8h6m-6 4h6m-6 4h6m-6-8h6m-6 4h6m-6 4h6"></path>
                                    </svg>
                                </motion.div>
                                <div className="mt-2">
                                    <h3 className="text-lg font-semibold text-[#00ccff]">Sell your bike quickly and easily.</h3>
                                </div>
                            </motion.div>
                            
                            <motion.div 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col items-start space-y-2 pl-3 pr-6 py-3 w-[90vw] max-w-[400px] h-[120px] bg-[#0D0D0D] border-2 border-transparent rounded-lg hover:border-t-[#2D334A] hover:border-l-[#2D334A] hover:border-b-transparent hover:border-r-transparent cursor-pointer"
                            >
                                <motion.div 
                                    className="p-3 bg-[#2D334A] rounded-full"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-6 8h6m-6 4h6m-6 4h6m-6-8h6m-6 4h6m-6 4h6"></path>
                                    </svg>
                                </motion.div>
                                <div className="mt-2">
                                    <h3 className="text-lg font-semibold text-[#7689D0]">Search by brand, type, size, and more.</h3>
                                </div>
                            </motion.div>
                                
                            
                            <motion.div 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col items-start space-y-2 pl-3 pr-6 py-3 w-[90vw] max-w-[400px] h-[120px] border border-transparent rounded-lg bg-[#0D0D0D] hover:border-t-[#EF4444] hover:border-l-[#EF4444] hover:border-b-transparent hover:border-r-transparent cursor-pointer"
                            >
                                <motion.div 
                                    className="p-3 bg-red-500 rounded-full"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-6 8h6m-6 4h6m-6 4h6m-6-8h6m-6 4h6m-6 4h6"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2a10 10 0 100 20 10 10 0 000-20z"></path>
                                    </svg>
                                </motion.div>
                                <div className="mt-2">
                                    <h3 className="text-lg font-semibold text-[#EF4444]">Save your favorite bikes for later.</h3>
                                </div>
                            </motion.div>
                            <motion.div 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col items-start space-y-2 pl-3 pr-6 py-3 w-[90vw] max-w-[400px] h-[120px] border border-transparent rounded-lg bg-[#0D0D0D] hover:border-t-[#22C55E] hover:border-l-[#22C55E] hover:border-b-transparent hover:border-r-transparent cursor-pointer"
                            >
                                <motion.div 
                                    className="p-3 bg-green-500 rounded-full"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2a10 10 0 100 20 10 10 0 000-20z"></path>
                                    </svg>
                                </motion.div>
                                <div className="mt-2">
                                    <h3 className="text-lg font-semibold text-[#22C55E]">Save big on your next bike purchase.</h3>
                                </div>
                            </motion.div>
                        </div>
                        
                        <div className="w-full max-w-md p-6 mt-8 rounded-xl shadow-lg bg-[#16171C] md:mt-0">
                            <h2 className="mb-4 text-2xl font-bold">Secure Access Made Simple</h2>
                            <p className="mb-4">Accessing your account is a CodeHelp. Pick your preferred login method.</p>
                            
                            <button style={{width: '80%', margin: '10px auto' }} className="flex items-center justify-center w-full px-4 py-2 text-white bg-transparent border-2 border-gray-700 focus:border-pink-600 rounded-full hover:bg-[#3A3C3F]">
                                <img src={google} className="w-6 h-6 mr-5" alt="google" />
                                Continue with Google 
                            </button>
                            
                            {/* <button style={{width: '80%', margin: '0 auto'}} className="flex items-center justify-center w-full px-4 py-2 mt-3 text-white bg-transparent border-2 border-gray-700 focus:border-pink-600 rounded-full hover:bg-[#3A3C3F]">
                                <img src={instagram} className="w-6 h-6 mr-5" alt="google" />
                                Continue with GitHub
                            </button> */}
                            
                            <div className="flex items-center justify-center my-4">
                                <hr className="w-8 h-px bg-[#4A4C51]"/>
                                <p className="px-4 text-sm text-[#4A4C51]">Register/Login with Email</p>
                                <hr className="w-8 h-px bg-[#4A4C51]"/>
                            </div>
                            
                            <form className="w-full" onSubmit={submitHandler}>
                                
                                <div className="relative">
                                    <img src={userr} className="absolute w-5 h-5 left-3 top-8" alt="user" />
                                    <input 
                                        type="text" 
                                        name="fullname"
                                        onChange={changeEventHandler}
                                        value={input.fullname}
                                        placeholder="Enter your username" 
                                        className="w-full p-3 pl-10 mt-4 mb-2 text-white border-2 border-transparent rounded-full" 
                                    />
                                </div>
                                
                                <div className="relative">
                                    <img src={eemail} className="absolute w-5 h-5 left-3 top-8" alt="email" />
                                    <input 
                                        type="email" 
                                        name="email"
                                        onChange={changeEventHandler}
                                        value={input.email}
                                        placeholder="Enter your email" 
                                        className="w-full p-3 pl-10 mt-4 mb-2 text-white border-2 border-transparent rounded-full" 
                                    />
                                </div>
                                
                                
                                <div className="relative">
                                    <img src={ppassword} className="absolute w-5 h-5 left-3 top-8" alt="password" />
                                    <input 
                                        type="text"
                                        name="password"
                                        onChange={changeEventHandler}
                                        value={input.password} 
                                        placeholder="Enter your Password" 
                                        className="w-full p-3 pl-10 mt-4 mb-2 text-white border-2 border-transparent rounded-full" 
                                    />
                                </div>
                                
                                <div className="relative">
                                    <img src={pphone} className="absolute w-5 h-5 left-3 top-8" alt="phone" />
                                    <input 
                                        type="tel" 
                                        name="phone"
                                        onChange={changeEventHandler}
                                        value={input.phone}
                                        placeholder="+91__________" 
                                        className="w-full p-3 pl-10 mt-4 mb-2 text-white border-2 border-transparent rounded-full" 
                                        defaultValue="+91"
                                    />
                                </div>
{/* 
                                <div className="relative">
                                    <img src={aaddress} className="absolute w-5 h-5 left-3 top-8" alt="phone" />
                                    <input 
                                        type="text" 
                                        name="address"
                                        onChange={changeEventHandler}
                                        value={input.address}
                                        placeholder="Enter Your Address" 
                                        className="w-full p-3 pl-10 mt-4 mb-2 text-white border-2 border-transparent rounded-full" 
                                        defaultValue="+91"
                                    />
                                </div> */}

                                <div className='flex items-center justify-between'>
                                    <RadioGroup className="flex items-end gap-4 my-5 w-full">

                                        <div className="flex items-center space-x-2 ">
                                            <Input
                                                type="radio"
                                                name="role"
                                                value="user"
                                                checked={input.role === 'user'}
                                                onChange={changeEventHandler}
                                                className="cursor-pointer"
                                            />
                                            <Label htmlFor="r1">User</Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Input
                                                type="radio"
                                                name="role"
                                                value="shopOwner"
                                                checked={input.role === 'shopOwner'}
                                                onChange={changeEventHandler}
                                                className="cursor-pointer"
                                            />
                                            <Label htmlFor="r2">shopOwner</Label>
                                        </div>

                                    </RadioGroup>
                                </div>
                                
                                <p className="my-2 text-xs text-center text-white">Do not have an account?  <Link to='/login' className="text-base text-blue-900 hover:underline">Login</Link> </p>
                                {
                                    loading ? (
                                        <button className="w-full">
                                            <div className="submit-button">
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                <Loader2 className="w-6 h-6 text-white" />
                                            </div>
                                            please wait...
                                        </button>
                                    ) : (
                                        <button type='submit' className="w-full">
                                            <div className="submit-button">
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                Register
                                            </div>
                                        </button>
                                    )
                                }

                                {/* <button type='submit' className="w-full">
                                    <a href="#" className="submit-button">
                                        <span></span>
                                        <span></span>
                                        <span></span>                               
                                        <span></span>
                                        Register
                                    </a>
                                </button> */}

                            </form>

                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default SignUp