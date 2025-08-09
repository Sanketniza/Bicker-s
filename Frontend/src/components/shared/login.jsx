import '../../App.css';

import google from '../../assets/icons/google.png';
import instagram from '../../assets/icons/instagram.png';
import eemail from '../../assets/icons/email (1).png';
import ppassword from '../../assets/icons/pass.png';
import { motion } from "motion/react";
import {Link, useNavigate}  from 'react-router-dom';
import Navbar from './Navbar';

import '../../css/Login.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/store/authSlice';
import axios from 'axios';
import { toast } from 'sonner';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { Input } from '../ui/input';
import { Label, RadioGroup } from '@radix-ui/react-dropdown-menu';



function Login() {

    const [input , setInput] = useState({
        email: '',
        password: '',
        role:""
    });
    const [showPassword, setShowPassword] = useState(false);

    const {loading, user} = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ 
            ...input, [e.target.name]: e.target.value 
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            dispatch(setLoading(true));
            const res = await axios.post('http://localhost:8000/api/v1/user/login', input , {
            // const res = await axios.post('https://routers-baking-paragraph-sponsors.trycloudflare.com/api/v1/user/login', {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if(res.data.success) {
                dispatch(setUser(res.data.user));
                if(res.data.user.role === 'user') {
                    navigate("/");
                } else {
                    navigate("/admin");
                }
                toast.success('Login Successfully', {
                    style: {
                        color: '#10B981',
                        backgroundColor: '#09090B',
                        fontSize: '20px',
                        borderColor: '#10B981',
                        padding: '10px 20px'
                    }
                });
            }
        } catch(error) {
            console.log(error, "Error at login");
            
            // Check if the error is due to unverified email
            if (error.response?.data?.needsVerification) {
                // Redirect to verification page with email
                toast.error('Please verify your email before logging in');
                navigate(`/verify-email?email=${error.response.data.email}`, { 
                    state: { email: error.response.data.email } 
                });
            } else {
                toast.error(error.response?.data?.message || 'Invalid Credentials');
            }
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if(user) {
            navigate("/");
        }
    },[]);

    return (
        <>
            <div>
                
                <Navbar />

                <div className="flex items-center justify-center min-h-screen px-2 text-white md:px-0">
                    <div className="flex flex-col items-center space-x-10 md:flex-row md:items-start">

                          <div className="cards p-12 ">

                            <div style={{width: '300px', height: '120px'}} className="card p-3 pink border border-transparent rounded-lg bg-[#0D0D0D] hover:border-t-[#EF4444] hover:border-l-[#EF4444] hover:border-b-transparent hover:border-r-transparent cursor-pointer ">
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
                                    <h3 className="text-lg font-semibold text-[#EF4444]">Browse thousands of bikes, all in one place.</h3>
                                </div>
                            </div>

                            <div style={{width: '300px', height: '120px'}} className="card p-3 yellow border border-transparent rounded-lg bg-[#0D0D0D] hover:border-t-[#22C55E] hover:border-l-[#22C55E] hover:border-b-transparent hover:border-r-transparent cursor-pointer">
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
                                    <h3 className="text-lg font-semibold text-[#22C55E]">Huge selection, find your dream ride.</h3>
                                </div>
                            </div>

                            <div style={{width: '300px', height: '120px'}} className="card p-3 yellow border border-transparent rounded-lg bg-[#0D0D0D] hover:border-t-[#00ccff] hover:border-l-[#00ccff] hover:border-b-transparent hover:border-r-transparent cursor-pointer">
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
                                    <h3 className="text-lg font-semibold text-[#00ccff]">New and used bikes, catering to every budget.</h3>
                                </div>
                            </div>

                            <div style={{width: '300px', height: '120px'}} className="card p-3 yellow border-2 border-transparent rounded-lg  bg-[#0D0D0D]  hover:border-t-[#2D334A] hover:border-l-[#2D334A] hover:border-b-transparent hover:border-r-transparent cursor-pointer">
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
                                    <h3 className="text-lg font-semibold text-[#7689D0]">Contact us anytime with your questions.</h3>
                                </div>
                            </div>

                          </div>

                        
                        <div className="w-full max-w-md p-6 mt-8 rounded-xl shadow-lg bg-[#16171C] md:mt-0">
                            <h2 className="mb-4 text-2xl font-bold">Secure Access Made Simple</h2>
                            <p className="mb-4">Accessing your account is a Biker&apos;s. Pick your preferred login method.</p>
                            <button style={{width: '80%', margin: '10px auto' }} className="flex items-center justify-center w-full px-4 py-2 text-white bg-transparent border-2 border-gray-700 focus:border-pink-600 rounded-full hover:bg-[#3A3C3F]">
                                <img src={google} className="w-6 h-6 mr-5" alt="google" />
                                Continue with Google
                            </button>
                            

                            <div className="flex items-center justify-center my-4">
                                <hr className="w-8 h-px bg-[#4A4C51]"/>
                                <p className="px-4 text-sm text-[#4A4C51]">Register/Login with Email</p>
                                <hr className="w-8 h-px bg-[#4A4C51]"/>
                            </div>
                            <form 
                                onSubmit={handleSubmit}
                                className="w-full"
                            >

                                <div className="relative">
                                    <img src={eemail} className="absolute w-5 h-5 left-3 top-8" alt="email" />
                                    <input 
                                        type="text" 
                                        name="email"
                                        placeholder="Enter your email" 
                                        value={input.email}
                                        onChange={changeEventHandler}
                                        className="w-full p-3 pl-10 mt-4 mb-2 text-white border-2 border-transparent rounded-full" 
                                    />
                                </div>                                <div className="relative">
                                    <img src={ppassword} className="absolute w-5 h-5 left-3 top-8" alt="email" />
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        name="password"
                                        value={input.password}
                                        onChange={changeEventHandler}
                                        placeholder="Enter your Password" 
                                        className="w-full p-3 pl-10 mt-4 mb-2 text-white border-2 border-transparent rounded-full" 
                                    />
                                    <button 
                                        type="button"
                                        className="absolute inset-y-0 right-0 top-4 flex items-center px-2"
                                        style={{right: '-6.0rem'}}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? 
                                            <EyeOff className="w-5 h-5 text-gray-400" /> : 
                                            <Eye className="w-5 h-5 text-gray-400" />
                                        }
                                    </button>

                                    <div>
                                        <Link to='/forgot-password' className="float-right text-sm mr-4  text-[#4A4C51] hover:text-[#EF4444]">Forgot Password?</Link>
                                    </div>
                                </div>

                                <div className='flex items-center justify-between mx-2'>
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






                                <p className="my-2 text-xs text-center text-white">Do not have an account?  <Link to='/signup' className="text-base text-blue-900 hover:underline">Register</Link> </p>

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
                                                Login
                                            </div>
                                        </button>
                                    )
                                }
                                
                                {/* <button type='submit' className="w-full">
                                    <Link to='/login' className="submit-button">
                                        <span></span>
                                        <span></span>
                                        <span></span>                               
                                        <span></span>
                                        Login
                                    </Link>
                                </button> */}

                            </form>
                        </div>
                    </div>
                </div>
             </div>
        </>
    );
}

export default Login;