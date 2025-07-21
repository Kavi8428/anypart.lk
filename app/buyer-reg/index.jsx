import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import BeginningTheme from '../../components/ui/theme/beginning/Layout';
import RegisterForm from '../../components/auth/RegisterForm';

const BuyerReg = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [mobile, setMobile] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [addressError, setAddressError] = useState('');
  const [cityError, setCityError] = useState('');
  const [districtError, setDistrictError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleRegister = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
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

    if (!city.trim()) {
      setCityError('City is required');
      isValid = false;
    } else {
      setCityError('');
    }

    if (!district.trim()) {
      setDistrictError('District is required');
      isValid = false;
    } else {
      setDistrictError('');
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
      console.log('Registering with:', {
        name,
        email,
        password,
        address,
        city,
        district,
        mobile,
        confirmPassword,
      });
      router.push('/buyer-confirm');
    }
  };

  return (
    <BeginningTheme
      footerButtons={['Previous', 'Login', 'Next']}
      headerTitle="Buyer Registration"
    >
      <RegisterForm
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        nameError={nameError}
        setNameError={setNameError}
        emailError={emailError}
        setEmailError={setEmailError}
        passwordError={passwordError}
        setPasswordError={setPasswordError}
        handleRegister={handleRegister}
        address={address}
        setAddress={setAddress}
        city={city}
        setCity={setCity}
        district={district}
        setDistrict={setDistrict}
        mobile={mobile}
        setMobile={setMobile}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        addressError={addressError}
        setAddressError={setAddressError}
        cityError={cityError}
        setCityError={setCityError}
        districtError={districtError}
        setDistrictError={setDistrictError}
        mobileError={mobileError}
        setMobileError={setMobileError}
        confirmPasswordError={confirmPasswordError}
        setConfirmPasswordError={setConfirmPasswordError}
      />
    </BeginningTheme>
  );
};

export default BuyerReg;