import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import Navbar from '../shared/Navbar';
import ppassword from '../../assets/icons/pass.png';

function ResetPassword() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [step, setStep] = useState(1); // 1: OTP verification, 2: Password reset
    const [loading, setLoading] = useState(false);
    const [resetToken, setResetToken] = useState('');
    const [email, setEmail] = useState('');
    const [countdown, setCountdown] = useState(0);
    const [resendLoading, setResendLoading] = useState(false);
    
    const { token } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        // If token is present in URL, skip OTP verification
        if (token) {
            setResetToken(token);
            setStep(2);
        } else {
            // Check for email in location state or query params
            const params = new URLSearchParams(location.search);
            const emailParam = params.get('email');
            const emailFromState = location.state?.email;
            
            if (emailFromState) {
                setEmail(emailFromState);
            } else if (emailParam) {
                setEmail(emailParam);
            } else {
                // If no email is provided, redirect to forgot password
                navigate('/forgot-password');
            }
        }
    }, [token, location, navigate]);
    
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

    const handleVerifyOTP = async () => {
        // Combine OTP digits
        const otpString = otp.join('');
        
        // Validate OTP
        if (otpString.length !== 6) {
            toast.error('Please enter all 6 digits of the OTP');
            return;
        }
        
        try {
            setLoading(true);
            
            const response = await axios.post('http://localhost:8000/api/v1/user/verify-reset-otp', 
                { email, otp: otpString },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            
            if (response.data.success) {
                // Save reset token and proceed to password reset step
                setResetToken(response.data.resetToken);
                setStep(2);
                toast.success('OTP verified successfully');
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

    const handleResendOTP = async () => {
        try {
            setResendLoading(true);
            
            const response = await axios.post('http://localhost:8000/api/v1/user/forgot-password', 
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

    const handleResetPassword = async () => {
        // Validate passwords
        if (!password) {
            toast.error('Please enter a new password');
            return;
        }
        
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return;
        }
        
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        
        try {
            setLoading(true);
            
            let response;
            
            // If token is in URL params, use the token-based endpoint
            if (token) {
                response = await axios.post(`http://localhost:8000/api/v1/user/reset-password/${token}`, 
                    { newPassword: password },
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );
            } else {
                // Otherwise use the standard reset endpoint
                response = await axios.post('http://localhost:8000/api/v1/user/reset-password', 
                    { 
                        resetToken,
                        newPassword: password 
                    },
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );
            }
            
            if (response.data.success) {
                toast.success('Password reset successfully');
                
                // Redirect to login after a short delay
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            toast.error(
                error.response?.data?.message || 
                'Failed to reset password. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-900">
                <div className="w-full max-w-md p-6 rounded-xl shadow-lg bg-[#16171C]">
                    {step === 1 ? (
                        // OTP Verification Step
                        <>
                            <h2 className="mb-2 text-2xl font-bold text-center text-white">Verify OTP</h2>
                            <p className="mb-6 text-center text-gray-300">
                                We've sent a 6-digit code to <span className="text-emerald-500 font-semibold">{email}</span>. 
                                Enter the code below to reset your password.
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
                                Didn't receive the code? {' '}
                                {countdown > 0 ? (
                                    <span>Resend in {countdown}s</span>
                                ) : (
                                    <button 
                                        onClick={handleResendOTP}
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
                                <button onClick={handleVerifyOTP} className="w-full">
                                    <div className="submit-button">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        Verify OTP
                                    </div>
                                </button>
                            )}
                        </>
                    ) : (
                        // Password Reset Step
                        <>
                            <h2 className="mb-4 text-2xl font-bold text-center text-white">Reset Your Password</h2>
                            <p className="mb-6 text-center text-[#10B981]">
                                Create a new password for your account
                            </p>
                            
                            <div className="space-y-4">
                                <div className="relative">
                                    <img src={ppassword} className="absolute w-5 h-5 left-3 top-4" alt="email" />
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="New Password" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full p-3 pl-10 pr-10 mb-4 text-white border-2 border-transparent rounded-full focus:border-emerald-500 bg-gray-800" 
                                        required
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-1 top-1 text-gray-400"
                                        style={{right: '-6.0rem'}}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                
                                <div className="relative">
                                    <img src={ppassword} className="absolute w-5 h-5 left-3 top-4" alt="email" />
                                    <input 
                                        type={showConfirmPassword ? "text" : "password"} 
                                        placeholder="Confirm Password" 
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full p-3 pl-10 pr-10 mb-4 text-white border-2 border-transparent rounded-full focus:border-emerald-500 bg-gray-800" 
                                        required
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1 text-gray-400"
                                        style={{right: '-6.0rem'}}
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                            
                            {loading ? (
                                <button className="w-full mt-4" disabled>
                                    <div className="submit-button">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <Loader2 className="w-6 h-6 text-white animate-spin" />
                                    </div>
                                    Resetting...
                                </button>
                            ) : (
                                <button onClick={handleResetPassword} className="w-full mt-4">
                                    <div className="submit-button">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        Reset Password
                                    </div>
                                </button>
                            )}
                        </>
                    )}
                    
                    <p className="mt-4 text-center text-sm text-gray-400">
                        Remember your password? <Link to="/login" className="text-emerald-500 hover:underline">Log in</Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;
