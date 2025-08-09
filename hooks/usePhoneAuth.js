import { useState } from 'react';
import phoneAuthService from '../services/firebase/phoneAuth';

export const usePhoneAuth = () => {
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState(null);
  const [verificationCode, setVerificationCode] = useState('');

  const sendOTP = async (phoneNumber) => {
    setLoading(true);
    setError(null);
    setVerificationCode(''); // Reset OTP input
    const result = await phoneAuthService.sendOTP(phoneNumber);
    if (result.success) {
      setOtpSent(true);
    } else {
      setError(result.error);
    }
    setLoading(false);
    return result;
  };

  const verifyOTP = async (otp) => {
    setLoading(true);
    setError(null);
    const result = await phoneAuthService.verifyOTP(otp || verificationCode);
    if (!result.success) {
      setError(result.error);
    }
    setLoading(false);
    return result;
  };

  const resetState = () => {
    setOtpSent(false);
    setError(null);
    setVerificationCode('');
    setLoading(false);
  };

  return {
    sendOTP,
    verifyOTP,
    loading,
    otpSent,
    error,
    verificationCode,
    setVerificationCode,
    resetState,
  };
};