import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from '@rneui/base';
import { Mail, BookUser, BadgeAlert } from 'lucide-react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { cities, districts } from '../../lib/mockdata'; // Adjust path as needed

const RegisterForm = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  nameError,
  setNameError,
  emailError,
  setEmailError,
  passwordError,
  setPasswordError,
  handleRegister,
  address,
  setAddress,
  city,
  setCity,
  district,
  setDistrict,
  mobile,
  setMobile,
  confirmPassword,
  setConfirmPassword,
  addressError,
  setAddressError,
  cityError,
  setCityError,
  districtError,
  setDistrictError,
  mobileError,
  setMobileError,
  confirmPasswordError,
  setConfirmPasswordError,
}) => {
  // Ensure local state is always controlled with a default empty string
  const [localCity, setLocalCity] = useState(city || '');
  const [localDistrict, setLocalDistrict] = useState(district || '');

  // Sync local state with parent props on mount or when props change
  useEffect(() => {
    setLocalCity(city || '');
  }, [city]);

  useEffect(() => {
    setLocalDistrict(district || '');
  }, [district]);

  const validateForm = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Invalid email');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!address.trim()) {
      setAddressError('Address is required');
      isValid = false;
    } else {
      setAddressError('');
    }

    if (!localCity.trim()) {
      setCityError('City is required');
      isValid = false;
    } else {
      setCityError('');
      setCity(localCity); // Sync with parent state
    }

    if (!localDistrict.trim()) {
      setDistrictError('District is required');
      isValid = false;
    } else {
      setDistrictError('');
      setDistrict(localDistrict); // Sync with parent state
    }

    if (!mobile || !/^\d{10}$/.test(mobile)) {
      setMobileError('Mobile number must be 10 digits');
      isValid = false;
    } else {
      setMobileError('');
    }

    if (!confirmPassword || confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (isValid) {
      handleRegister();
    }
  };

  return (
    <View className="bg-transparent">
      {/* Header Section */}
      <View className="mb-6 justify-center items-center">
        <Text className="text-red-900 font-bold text-2xl mb-2">
          Let's find your part
        </Text>
        <View className="flex-row items-center w-3/5">
          <View className="mx-4">
            <BookUser color="#ff5500" />
          </View>
          <View className="flex-1 h-0.5 bg-blue-500" />
          <View className="ml-4">
            <Mail size={24} color="#000000" />
          </View>
        </View>
        <Text className="mt-2 text-center text-3xl font-semibold">
          REGISTER
        </Text>
      </View>

      {/* Form Fields */}
      <View className="mb-1">
        <View className="flex-row items-center gap-2 justify-start">
          <Text className="text-gray-700 text-lg">Your Name</Text>
          <BadgeAlert color={'red'} size={16} />
        </View>
        <Input
          placeholder="Enter your name"
          value={name}
          onChangeText={(text) => {
            setName(text);
            if (!text.trim()) setNameError('Name is required');
            else setNameError('');
          }}
          autoCapitalize="words"
          autoCorrect={false}
          inputContainerStyle={{
            borderBottomWidth: 1,
            borderBottomColor: nameError ? '#EF4444' : '#D1D5DB',
          }}
          inputStyle={{ color: '#1F2937', fontSize: 16 }}
          containerStyle={{ paddingHorizontal: 0 }}
          className="bg-transparent"
          placeholderTextColor="#9CA3AF"
        />
        {nameError ? (
          <Text className="text-red-500 text-sm mt-0">{nameError}</Text>
        ) : null}
      </View>

      <View className="mb-1">
        <View className="flex-row items-center gap-2 justify-start">
          <Text className="text-gray-700 text-lg">Address</Text>
          <BadgeAlert color={'red'} size={16} />
        </View>
        <Input
          placeholder="Enter your address"
          value={address}
          onChangeText={(text) => {
            setAddress(text);
            if (!text.trim()) setAddressError('Address is required');
            else setAddressError('');
          }}
          autoCapitalize="sentences"
          autoCorrect={false}
          inputContainerStyle={{
            borderBottomWidth: 1,
            borderBottomColor: addressError ? '#EF4444' : '#D1D5DB',
          }}
          inputStyle={{ color: '#1F2937', fontSize: 16 }}
          containerStyle={{ paddingHorizontal: 0 }}
          className="bg-transparent"
          placeholderTextColor="#9CA3AF"
        />
        {addressError ? (
          <Text className="text-red-500 text-sm mt-0">{addressError}</Text>
        ) : null}
      </View>

      <View className="mb-1 flex-row gap-2">
        <View className="w-1/2 pr-1">
          <View className="flex-row items-center gap-2 justify-start">
            <Text className="text-gray-700 text-lg">City</Text>
            <BadgeAlert color={'red'} size={16} />
          </View>
          <SearchableDropdown
            onItemSelect={(item) => {
              const selectedCity = item.name || '';
              setLocalCity(selectedCity);
              if (selectedCity) {
                setCityError('');
                setCity(selectedCity); // Sync with parent state
              } else {
                setCityError('City is required');
              }
            }}
            containerStyle={{ padding: 5 }}
            textInputStyle={{
              borderBottomWidth: 1,
              borderBottomColor: cityError ? '#EF4444' : '#D1D5DB',
              color: '#1F2937',
              fontSize: 16,
              paddingVertical: 8,
              paddingHorizontal: 0,
            }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: '#222' }}
            items={cities}
            defaultIndex={0}
            resetValue={false}
            placeholder="Select City"
            placeholderTextColor="#9CA3AF"
            underlineColorAndroid="transparent"
            value={localCity} // Controlled component
          />
          {cityError ? (
            <Text className="text-red-500 text-sm mt-0">{cityError}</Text>
          ) : null}
        </View>
        <View className="w-1/2 pl-1">
          <View className="flex-row items-center gap-2 justify-start">
            <Text className="text-gray-700 text-lg">District</Text>
            <BadgeAlert color={'red'} size={16} />
          </View>
          <SearchableDropdown
            onItemSelect={(item) => {
              const selectedDistrict = item.name || '';
              setLocalDistrict(selectedDistrict);
              if (selectedDistrict) {
                setDistrictError('');
                setDistrict(selectedDistrict); // Sync with parent state
              } else {
                setDistrictError('District is required');
              }
            }}
            containerStyle={{ padding: 5 }}
            textInputStyle={{
              borderBottomWidth: 1,
              borderBottomColor: districtError ? '#EF4444' : '#D1D5DB',
              color: '#1F2937',
              fontSize: 16,
              paddingVertical: 8,
              paddingHorizontal: 0,
            }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: '#222' }}
            items={districts}
            defaultIndex={0}
            resetValue={false}
            placeholder="Select District"
            placeholderTextColor="#9CA3AF"
            underlineColorAndroid="transparent"
            value={localDistrict} // Controlled component
          />
          {districtError ? (
            <Text className="text-red-500 text-sm mt-0">{districtError}</Text>
          ) : null}
        </View>
      </View>

      <View className="mb-1">
        <View className="flex-row items-center gap-2 justify-start">
          <Text className="text-gray-700 text-lg">Mobile Number</Text>
          <BadgeAlert color={'red'} size={16} />
        </View>
        <Input
          placeholder="Enter your mobile number"
          value={mobile}
          onChangeText={(text) => {
            setMobile(text);
            if (!/^\d{10}$/.test(text)) setMobileError('Mobile number must be 10 digits');
            else setMobileError('');
          }}
          keyboardType="phone-pad"
          autoCapitalize="none"
          autoCorrect={false}
          inputContainerStyle={{
            borderBottomWidth: 1,
            borderBottomColor: mobileError ? '#EF4444' : '#D1D5DB',
          }}
          inputStyle={{ color: '#1F2937', fontSize: 16 }}
          containerStyle={{ paddingHorizontal: 0 }}
          className="bg-transparent"
          placeholderTextColor="#9CA3AF"
        />
        {mobileError ? (
          <Text className="text-red-500 text-sm mt-0">{mobileError}</Text>
        ) : null}
      </View>

      <View className="mb-1">
        <View className="flex-row items-center gap-2 justify-start">
          <Text className="text-gray-700 text-lg">Password</Text>
          <BadgeAlert color={'red'} size={16} />
        </View>
        <Input
          placeholder="Enter your password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (text.length < 6) setPasswordError('Password must be at least 6 characters');
            else setPasswordError('');
          }}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          inputContainerStyle={{
            borderBottomWidth: 1,
            borderBottomColor: passwordError ? '#EF4444' : '#D1D5DB',
          }}
          inputStyle={{ color: '#1F2937', fontSize: 16 }}
          containerStyle={{ paddingHorizontal: 0 }}
          className="bg-transparent"
          placeholderTextColor="#9CA3AF"
        />
        {passwordError ? (
          <Text className="text-red-500 text-sm mt-0">{passwordError}</Text>
        ) : null}
      </View>

      <View className="mb-6">
        <View className="flex-row items-center gap-2 justify-start">
          <Text className="text-gray-700 text-lg">Confirm Password</Text>
          <BadgeAlert color={'red'} size={16} />
        </View>
        <Input
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            if (text !== password) setConfirmPasswordError('Passwords do not match');
            else setConfirmPasswordError('');
          }}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          inputContainerStyle={{
            borderBottomWidth: 1,
            borderBottomColor: confirmPasswordError ? '#EF4444' : '#D1D5DB',
          }}
          inputStyle={{ color: '#1F2937', fontSize: 16 }}
          containerStyle={{ paddingHorizontal: 0 }}
          className="bg-transparent"
          placeholderTextColor="#9CA3AF"
        />
        {confirmPasswordError ? (
          <Text className="text-red-500 text-sm mt-0">{confirmPasswordError}</Text>
        ) : null}
      </View>
    </View>
  );
};

export default RegisterForm;