import { saveBuyerRegistration, checkMobileExists } from '../firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, ref, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

export const registerBuyer = async (userData) => {
  // Validate required fields (mobile number as username)
  if (!userData.mobile || !/^\d{10}$/.test(userData.mobile)) {
    return { success: false, errorCode: 'MOBILE_INVALID', errorMessage: 'Valid 10-digit mobile number is required' };
  }
  if (!userData.name.trim()) {
    return { success: false, errorCode: 'NAME_EMPTY', errorMessage: 'Name cannot be empty' };
  }
  if (!userData.address.trim()) {
    return { success: false, errorCode: 'ADDRESS_EMPTY', errorMessage: 'Address is required' };
  }
  if (!userData.city.trim()) {
    return { success: false, errorCode: 'CITY_EMPTY', errorMessage: 'City is required' };
  }
  if (!userData.district.trim()) {
    return { success: false, errorCode: 'DISTRICT_EMPTY', errorMessage: 'District is required' };
  }

  // Check for duplicate mobile number
  const mobileExists = await checkMobileExists(userData.mobile);
  if (mobileExists) {
    return { success: false, errorCode: 'DUPLICATE_MOBILE', errorMessage: 'An account with this mobile number already exists' };
  }

  // Process data: Combine address fields and exclude email if empty
  const processedData = {
    name: userData.name,
    mobile: userData.mobile,
    address: userData.address,
    city: userData.city,
    district: userData.district,
    fullAddress: `${userData.address}, ${userData.city}, ${userData.district}`,
    email: userData.email || null,
    processedAt: new Date().toISOString()
  };

  console.log('🔍 Processed registration data:', processedData);

  try {
    // Save to Firebase
    await saveBuyerRegistration(processedData);

    // Generate and store session token
    const sessionToken = uuidv4();
    await AsyncStorage.setItem('sessionToken', sessionToken);
    await AsyncStorage.setItem('userMobile', userData.mobile);

    // Save session to Firebase
    const dbRef = ref(getDatabase(), `sessions/${sessionToken}`);
    await set(dbRef, {
      mobile: userData.mobile,
      createdAt: new Date().toISOString(),
      lastVisited: '/buyer-confirm' // Initial state for future middleware
    });

    console.log('✅ Registration and session created successfully');

    return { success: true, message: 'Registration successful', sessionToken };
  } catch (error) {
    console.error('❌ Error in authService:', error.message);
    return { success: false, errorCode: 'SERVER_ERROR', errorMessage: 'Failed to process registration. Please try again.' };
  }
};