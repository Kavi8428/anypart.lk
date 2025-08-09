import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { usePhoneAuth } from '../../../hooks/usePhoneAuth';
import BeginningTheme from '../../../components/ui/theme/beginning/Layout';
import { BookUser, MailCheck } from 'lucide-react-native';

const OTPScreen = () => {
  const router = useRouter();
  const { sendOTP, verifyOTP, loading, error, verificationCode, setVerificationCode } = usePhoneAuth();
  const { mobile, name, email, address, city, district } = useLocalSearchParams();
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(192); // 3:12 in seconds
  const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
  const inputRefs = useRef([useRef(null), useRef(null), useRef(null), useRef(null)]);

  useEffect(() => {
    const initializeOTP = async () => {
      if (mobile && !otpSent) {
        const result = await sendOTP(mobile);
        if (result.success) {
          setOtpSent(true);
        } else {
          Alert.alert('Error', result.error || 'Failed to send OTP. Please try again.');
        }
      }
    };
    initializeOTP();
  }, [mobile, otpSent]);

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Format countdown to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle OTP digit change with focus shifting
  const handleOtpChange = (value, index) => {
    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value.slice(-1); // Take only the last character
    setOtpDigits(newOtpDigits);

    // Update verification code
    const fullOtp = newOtpDigits.join('');
    setVerificationCode(fullOtp);

    // Shift focus to next input if a digit is entered
    if (value && index < 3) {
      inputRefs.current[index + 1].current.focus();
    }

    // Shift focus to previous input if backspace is pressed and field is empty
    if (!value && index > 0) {
      inputRefs.current[index - 1].current.focus();
    }
  };

  const handleVerify = async () => {
    if (!loading && verificationCode.length === 4) {
      const result = await verifyOTP(verificationCode);
      if (result.success) {
        const userData = { name, email, address, city, district, mobile };
        const response = await registerBuyer(userData);
        Alert.alert('Success', response.message, [
          { text: 'OK', onPress: () => router.push('/buyer-confirm') },
        ]);
      } else {
        Alert.alert('Error', result.error || 'Invalid OTP. Please try again.');
      }
    }
  };

  const handleResendCode = async () => {
    if (!loading) {
      const result = await sendOTP(mobile);
      if (result.success) {
        setCountdown(192); // Reset countdown
        setOtpDigits(['', '', '', '']); // Clear OTP inputs
        setVerificationCode('');
        Alert.alert('Success', 'OTP sent successfully!');
      } else {
        Alert.alert('Error', result.error || 'Failed to resend OTP. Please try again.');
      }
    }
  };

  const handleCancel = () => {
    router.push('/buyer-reg');
  };

  return (
    <BeginningTheme
      footerButtons={['Previous', 'Login', 'Next']}
      headerTitle="OTP Verification"
    >
      <View className="flex-1 gap-4 items-center bg-transparent">
        {/* Header */}
        <View className="mb-4 items-center">
          <Text className="text-darkRed text-3xl font-medium mb-2">
            You're almost there!
          </Text>
          
          {/* Progress indicator */}
          <View className="flex-row items-center mt-4 mb-6">
            <BookUser color={'green'} size={30} />
            <View className="w-36 h-0.5 bg-blue-500"></View>
            <MailCheck color={'orange'} size={30} />
          </View>
        </View>

        {/* Main content */}
        <View className="items-center mb-8">
          <Text className="text-3xl font-semibold text-gray-800 mb-2">
            Check Your Phone
          </Text>
          <Text className="text-gray-600 text-lg text-center mb-12">
            We've sent the code to your phone
          </Text>
          
          {/* OTP Input boxes */}
          <View className="flex-row justify-center gap-4 mb-12">
            {otpDigits.map((digit, index) => (
              <TextInput
                key={index}
                ref={inputRefs.current[index]}
                className="w-24 h-24 border border-gray-900 rounded-2xl text-center text-lg font-semibold bg-white"
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                keyboardType="numeric"
                maxLength={1}
                selectTextOnFocus={true}
              />
            ))}
          </View>

          {/* Countdown */}
          <Text className="text-gray-600 text-2xl mb-8">
            Code expires in : {formatTime(countdown)}
          </Text>
        </View>

        {/* Buttons */}
        <View className="w-full max-w-xs gap-8 space-y-4">
          <TouchableOpacity 
            className="bg-white border border-orange-400 rounded-full py-3 px-0"
            onPress={handleVerify}
            disabled={loading || verificationCode.length !== 4}
          >
            <Text className="text-black text-xl font-medium text-center">
              {loading ? 'Verifying...' : 'Verify'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="bg-white border border-orange-400 rounded-full py-3 px-8"
            onPress={handleResendCode}
            disabled={loading || countdown > 0}
          >
            <Text className="text-black text-xl font-medium text-center">
              {countdown > 0 ? `Resend in ${formatTime(countdown)}` : 'Resend Code'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Error message */}
        {error && (
          <Text className="text-red-500 mt-4 text-center">
            {error}
          </Text>
        )}
      </View>
    </BeginningTheme>
  );
};

export default OTPScreen;