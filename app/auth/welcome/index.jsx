import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Input, Button } from '@rneui/base';
import { Link, useRouter } from 'expo-router';
import { Camera, CircleCheckBig, ArrowRight, Eye, EyeOff } from 'lucide-react-native';
import DisplayAnImage from '../../../components/ui/logo';
import OverlayComponent from './overLay';

const Index = () => {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mobileError, setMobileError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [overlayVisible, setOverlayVisible] = useState(false);

  const handleLogin = () => {
    let isValid = true;

    if (!/^(07\d{8})$/.test(mobileNumber)) {
      setMobileError('Please enter a valid 10-digit mobile number (e.g., 0712345678)');
      isValid = false;
    } else {
      setMobileError('');
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      console.log('Login with:', { mobileNumber, password });
      router.push('/home');
    }
  };

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  const onBuyPress = () => {
    toggleOverlay(); // Close the overlay
    router.push('/auth/buyer-reg'); // Redirect to /buy page
  };

  const onSellPress = () => {
    toggleOverlay(); // Close the overlay
    router.push('/auth/sell'); // Redirect to /sell page
  };

  return (
    <View className="flex-1 justify-center items-center bg-orange-500">
      <DisplayAnImage width={400} height={150} />
      <Text className="text-white text-7xl font-semibold mt-1">WELCOME</Text>
      <View className="mt-12 w-4/5">
        <Text className="text-white text-xl">Mobile Number</Text>
        <Input
          placeholder="Eg: 070123456"
          value={mobileNumber}
          onChangeText={(text) => {
            setMobileNumber(text);
            if (!/^\d*$/.test(text)) {
              setMobileError('Only numbers are allowed');
            } else if (text.length > 10) {
              setMobileError('Mobile number cannot exceed 10 digits');
            } else {
              setMobileError('');
            }
          }}
          keyboardType="phone-pad"
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={10}
          inputContainerStyle={{
            borderBottomWidth: 1,
            borderBottomColor: mobileError ? '#EF4444' : '#FFFFFF',
          }}
          inputStyle={{ color: '#FFFFFF', fontSize: 20 }}
          containerStyle={{ paddingHorizontal: 0 }}
          className="bg-transparent"
          placeholderTextColor="#D1D5DB"
        />
        {mobileError ? <Text className="text-red-500 text-sm mt-1">{mobileError}</Text> : null}
      </View>
      <View className="mt-4 w-4/5">
        <Text className="text-white text-xl">Password</Text>
        <View className="relative w-full">
          <Input
            placeholder="Eg: AnyPar****"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (text.length < 6) {
                setPasswordError('Password must be at least 6 characters long');
              } else {
                setPasswordError('');
              }
            }}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            inputContainerStyle={{
              borderBottomWidth: 1,
              borderBottomColor: passwordError ? '#EF4444' : '#FFFFFF',
            }}
            inputStyle={{ color: '#FFFFFF', fontSize: 20 }}
            containerStyle={{ paddingHorizontal: 0 }}
            className="bg-transparent"
            placeholderTextColor="#D1D5DB"
            rightIcon={
              <TouchableOpacity
                className="absolute right-2 top-2"
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff color="black" size={20} />
                ) : (
                  <Eye color="black" size={20} />
                )}
              </TouchableOpacity>
            }
          />
        </View>
        {passwordError ? <Text className="text-red-500 text-sm mt-1">{passwordError}</Text> : null}
      </View>
      <Button
        title="Login"
        onPress={handleLogin}
        buttonStyle={{ backgroundColor: '#FFFFFF', borderRadius: 12, paddingVertical: 8 }}
        titleStyle={{ color: '#F97316', fontSize: 24, fontWeight: '600' }}
        containerStyle={{ marginTop: 48, width: '70%' }}
        activeOpacity={0.7}
      />
      <Text className="text-white text-sm mt-2">
        Forgot Password..? <Text className="ms-2 underline">Let's Recover it</Text>
      </Text>
      <Text className="text-gray-700 text-lg font-bold mt-4">OR</Text>
      <Button
        title={
          <View className="flex-row items-center gap-5 justify-center">
            <CircleCheckBig color="white" size={36} />
            <View className="flex-col items-start">
              <View className="flex-row items-center">
                <Text className="text-white text-lg">Register</Text>
                <ArrowRight color="white" size={34} />
              </View>
              <Text className="text-white font-bold text-3xl">It's Free</Text>
            </View>
          </View>
        }
        onPress={toggleOverlay}
        buttonStyle={{ borderWidth: 2, borderColor: '#FFFFFF', borderRadius: 8, paddingVertical: 8 }}
        titleStyle={{ color: '#FFFFFF' }}
        containerStyle={{ marginTop: 16, width: '50%' }}
        type="outline"
      />
      <Button
        title="Just Have a Look.."
        onPress={() => router.push('/explore')}
        buttonStyle={{ borderWidth: 2, borderColor: '#FFFFFF', borderRadius: 8, paddingVertical: 8 }}
        titleStyle={{ color: '#FFFFFF', fontSize: 18 }}
        containerStyle={{ marginTop: 16, width: '60%' }}
        type="outline"
      />
      <OverlayComponent
        visible={overlayVisible}
        toggleOverlay={toggleOverlay}
        onBuyPress={onBuyPress}
        onSellPress={onSellPress}
      />
    </View>
  );
};

export default Index;