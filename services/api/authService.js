import { saveBuyerRegistration, checkMobileExists } from '../firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, ref, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

export const registerBuyer = async (userData) => {
  try {
    // Validate required fields (mobile number as username)
    if (!userData.mobile || !/^\d{10}$/.test(userData.mobile)) {
      throw new Error('Valid 10-digit mobile number is required');
    }
    if (!userData.name.trim()) {
      throw new Error('Name cannot be empty');
    }
    if (!userData.address.trim()) {
      throw new Error('Address is required');
    }
    if (!userData.city.trim()) {
      throw new Error('City is required');
    }
    if (!userData.district.trim()) {
      throw new Error('District is required');
    }

    // Check for duplicate mobile number
    const mobileExists = await checkMobileExists(userData.mobile);
    if (mobileExists) {
      throw new Error('An account with this mobile number already exists');
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
    throw error;
  }
};