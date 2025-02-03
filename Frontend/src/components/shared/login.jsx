import '../../App.css';

import google from '../../assets/icons/google.png';
import instagram from '../../assets/icons/instagram.png';
import email from '../../assets/icons/email (1).png';
import password from '../../assets/icons/pass.png';
import { motion } from "motion/react";
import {Link}  from 'react-router-dom';
import Navbar from './Navbar';

function Login() {
    return (
        <>
            <div>
                
                <Navbar />

                <div className="flex items-center justify-center min-h-screen px-2 text-white md:px-0">
                    <div className="flex flex-col items-center space-x-10 md:flex-row md:items-start">
                        
                        <div className="space-y-4 md:mr-6">
                            
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
                                    <h3 className="text-lg font-semibold text-[#00ccff]">Learn: Access 100+ Courses</h3>
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
                                    <h3 className="text-lg font-semibold text-[#7689D0]">Learn: Access 100+ Courses</h3>
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
                                    <h3 className="text-lg font-semibold text-[#EF4444]">Learn: Access 100+ Courses</h3>
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
                                    <h3 className="text-lg font-semibold text-[#22C55E]">Learn: Access 100+ Courses</h3>
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
                            <button style={{width: '80%', margin: '0 auto'}} className="flex items-center justify-center w-full px-4 py-2 mt-3 text-white bg-transparent border-2 border-gray-700 focus:border-pink-600 rounded-full hover:bg-[#3A3C3F]">
                                <img src={instagram} className="w-6 h-6 mr-5" alt="google" />
                                Continue with GitHub
                            </button>
                            <div className="flex items-center justify-center my-4">
                                <hr className="w-8 h-px bg-[#4A4C51]"/>
                                <p className="px-4 text-sm text-[#4A4C51]">Register/Login with Email</p>
                                <hr className="w-8 h-px bg-[#4A4C51]"/>
                            </div>
                            <form className="w-full">
                                <div className="relative">
                                    <img src={email} className="absolute w-5 h-5 left-3 top-8" alt="email" />
                                    <input type="text" placeholder="Enter your email" className="w-full p-3 pl-10 mt-4 mb-2 text-white border-2 border-transparent rounded-full" />
                                </div>
                                <div className="relative">
                                    <img src={password} className="absolute w-5 h-5 left-3 top-8" alt="email" />
                                    <input type="text" placeholder="Enter your Password" className="w-full p-3 pl-10 mt-4 mb-2 text-white border-2 border-transparent rounded-full" />
                                </div>
                                <p className="my-2 text-xs text-center text-white">Do not have an account?  <Link to='/sign-up' className="text-base text-blue-900 hover:underline">Register</Link> </p>
                                <button type='submit' className="w-full">
                                    <a href="#" className="submit-button">
                                        <span></span>
                                        <span></span>
                                        <span></span>                               
                                        <span></span>
                                        Login
                                    </a>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
        </>
    );
}

export default Login;