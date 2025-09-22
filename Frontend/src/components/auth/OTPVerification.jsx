import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import Navbar from '../shared/Navbar';

function OTPVerification() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [verified, setVerified] = useState(false);
    const [email, setEmail] = useState('');
    const [countdown, setCountdown] = useState(0);
    
    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        // Get email from location state or query params
        const params = new URLSearchParams(location.search);
        const emailParam = params.get('email');
        const emailFromState = location.state?.email;
        
        if (emailFromState) {
            setEmail(emailFromState);
        } else if (emailParam) {
            setEmail(emailParam);
        } else {
            // If no email is provided, redirect to login
            navigate('/login');
        }
    }, [location, navigate]);
    
    // Handle countdown for resend OTP
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const handleInputChange = (index, value) => {
        // Only allow numbers
        if (value && !/^\d+$/.test(value)) return;
        
        // Update the OTP array
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        
        // Auto-focus next input if current input is filled
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-input-${index + 1}`);
            if (nextInput) {
                nextInput.focus();
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text');
        
        // Only continue if pasted content is a 6-digit number
        if (!/^\d{6}$/.test(pastedData)) return;
        
        // Fill all inputs with the pasted digits
        const digits = pastedData.split('');
        setOtp(digits);
    };

    const handleKeyDown = (index, e) => {
        // Handle backspace: clear current field and focus previous field
        if (e.key === 'Backspace' && index > 0 && !otp[index]) {
            const newOtp = [...otp];
            newOtp[index - 1] = '';
            setOtp(newOtp);
            
            const prevInput = document.getElementById(`otp-input-${index - 1}`);
            if (prevInput) {
                prevInput.focus();
            }
        }
    };

    const handleVerify = async () => {
        // Combine OTP digits
        const otpString = otp.join('');
        
        // Validate OTP
        if (otpString.length !== 6) {
            toast.error('Please enter all 6 digits of the OTP');
            return;
        }
        
        try {
            setLoading(true);
            
            const response = await axios.post('http://localhost:8000/api/v1/user/verify/verify-otp', 
                { email, otp: otpString },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            
            if (response.data.success) {
                setVerified(true);
                toast.success('Email verified successfully');
                
                // Redirect to login after a short delay
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            toast.error(
                error.response?.data?.message || 
                'Failed to verify OTP. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        try {
            setResendLoading(true);
            
            const response = await axios.post('http://localhost:8000/api/v1/user/verify/resend-otp', 
                { email },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            
            if (response.data.success) {
                // Reset OTP fields
                setOtp(['', '', '', '', '', '']);
                
                // Set countdown for 60 seconds
                setCountdown(60);
                
                toast.success('OTP resent successfully');
            }
        } catch (error) {
            console.error('Error resending OTP:', error);
            toast.error(
                error.response?.data?.message || 
                'Failed to resend OTP. Please try again.'
            );
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-900">
                <div className="w-full max-w-md p-6 rounded-xl shadow-lg bg-[#16171C]">
                    {verified ? (
                        <div className="text-center">
                            <svg className="w-16 h-16 mx-auto mb-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <h2 className="mb-4 text-2xl font-bold text-white">Email Verified!</h2>
                            <p className="mb-6 text-gray-300">
                                Your email has been verified successfully. You will be redirected to the login page.
                            </p>
                            <Link to="/login" className="flex items-center justify-center w-full px-4 py-2 text-white bg-emerald-600 hover:bg-emerald-700 rounded-full transition duration-200">
                                Go to Login
                            </Link>
                        </div>
                    ) : (
                        <>
                            <h2 className="mb-2 text-2xl font-bold text-center text-white">Verify Your Email</h2>
                            <p className="mb-6 text-center text-gray-300">
                                We&lsquo;ve sent a 6-digit code to <span className="text-emerald-500 font-semibold">{email || 'your email'}</span>. 
                                Enter the code below to verify your account.
                            </p>
                            
                            <div className="flex justify-center space-x-2 mb-6" onPaste={handlePaste}>
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`otp-input-${index}`}
                                        type="text"
                                        maxLength="1"
                                        className="w-12 h-12 text-center text-white bg-gray-800 border-2 border-gray-700 rounded-lg focus:border-emerald-500 focus:outline-none"
                                        value={digit}
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        autoComplete="off"
                                    />
                                ))}
                            </div>
                            
                            <p className="mb-4 text-center text-sm text-gray-400">
                                Didn&apos;t receive the code? {' '}
                                {countdown > 0 ? (
                                    <span>Resend in {countdown}s</span>
                                ) : (
                                    <button 
                                        onClick={handleResend}
                                        disabled={resendLoading || countdown > 0}
                                        className="text-emerald-500 hover:underline"
                                    >
                                        {resendLoading ? 'Sending...' : 'Resend OTP'}
                                    </button>
                                )}
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
                                    Verifying...
                                </button>
                            ) : (
                                <button onClick={handleVerify} className="w-full">
                                    <div className="submit-button">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        Verify Email
                                    </div>
                                </button>
                            )}
                            
                            <p className="mt-4 text-center text-sm text-gray-400">
                                <Link to="/login" className="text-emerald-500 hover:underline">
                                    Back to Login
                                </Link>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default OTPVerification;
