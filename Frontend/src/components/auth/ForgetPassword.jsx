
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import Navbar from '../shared/Navbar';
import eemail from '../../assets/icons/email (1).png';
import { motion } from "motion/react";
import Footer from '../shared/footer';

function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email) {
            toast.error('Please enter your email address');
            return;
        }
        
        try {
            setLoading(true);
            
            // This will need to be connected to your backend endpoint
            // Replace with your actual API endpoint for password reset
            const response = await axios.post('http://localhost:8000/api/v1/user/forgot-password', 
                { email },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            
            // Assuming your API returns a success message
            if (response.data.success) {
                toast.success('Password reset instructions sent to your email');
                
                // Navigate to reset password page instead of showing success message
                navigate(`/reset-password?email=${email}`, { 
                    state: { email: email } 
                });
            } else {
                toast.error(response.data.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error sending reset email:', error);
            toast.error(
                error.response?.data?.message || 
                'Failed to send reset email. Please try again later.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-900">
                <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-8 px-4">
                    {/* Left side decorative content */}
                    <div className="w-full max-w-lg">
                        <h1 className="text-4xl font-bold text-white mb-6">
                            Forgot Your <span className="text-emerald-500">Password?</span>
                        </h1>
                        
                        <p className="text-gray-300 mb-8">
                            No worries, it happens to the best of us. Enter your email address and we'll send you instructions to reset your password.
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-3 border border-transparent rounded-lg bg-[#0D0D0D] hover:border-t-[#59ce41] hover:border-l-[#59ce41] hover:border-b-transparent hover:border-r-transparent cursor-pointer">
                                <motion.div 
                                    className="p-3 w-12 h-12 bg-emerald-500 rounded-full"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                    </svg>
                                </motion.div>
                                <div className="mt-2">
                                    <h3 className="text-lg font-semibold text-emerald-500">Secure Password Reset</h3>
                                </div>
                            </div>
                            
                            <div className="p-3  bg-[#0D0D0D] border border-transparent rounded-lg  hover:border-t-[#00ccff] hover:border-l-[#00ccff] hover:border-b-transparent hover:border-r-transparent cursor-pointer">
                                <motion.div 
                                    className="p-3 w-12 h-12 bg-[#00ccff] rounded-full"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                </motion.div>
                                <div className="mt-2 ">
                                    <h3 className="text-lg font-semibold text-[#00ccff]">Email Delivery</h3>
                                </div>
                            </div>
                        </div>

                    </div>

                       {/* Right side form */}
                    <div className="w-full max-w-md p-6 mt-8 border-2 border-[#316370] rounded-xl shadow-lg bg-[#16171C] md:mt-0">
                        <h2 className="mb-4 text-2xl font-bold text-orange-500">Reset Your Password</h2>
                        <p className="mb-6 text-gray-300">
                            Enter your email address and we'll send you a link to reset your password.
                        </p>
                        <form onSubmit={handleSubmit} className="w-full">
                            <div className="relative">
                                <img src={eemail} className="absolute w-5 h-5 left-3 top-8" alt="email" />
                                <input 
                                    type="email" 
                                    placeholder="Enter your email address" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-3 pl-10 mt-4 mb-6 text-white border-2 border-transparent rounded-full focus:border-emerald-500" 
                                    required
                                />
                            </div>

                            <p className="my-4 text-lg text-center text-white">
                                Remember your password? <Link to='/login' className="text-emerald-500 hover:underline">Log in</Link>
                            </p>

                            {loading ? (
                                <button className="w-full" disabled>
                                    <div className="submit-button">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <Loader2 className="w-6 h-6 text-white animate-spin" />
                                    </div>
                                    Processing...
                                </button>
                            ) : (
                                <button type="submit" className="w-full">
                                    <div className="submit-button">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        Reset Password
                                    </div>
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    );
}

export default ForgetPassword;