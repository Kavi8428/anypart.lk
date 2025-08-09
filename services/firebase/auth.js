import { getDatabase, ref, set, get } from 'firebase/database';
import { database } from './config';

/**
 * Check if a mobile number already exists in the buyers node
 */
export const checkMobileExists = async (mobile) => {
  try {
    const dbRef = ref(database, `buyers/${mobile}`);
    const snapshot = await get(dbRef);
    return snapshot.exists();
  } catch (error) {
    console.error('❌ Error checking mobile number:', error);
    throw error;
  }
};

/**
 * Save buyer registration data to Realtime Database
 */
export const saveBuyerRegistration = async (userData) => {
  try {
    const dbRef = ref(database, `buyers/${userData.mobile}`);
    await set(dbRef, {
      name: userData.name,
      email: userData.email,
      address: userData.address,
      city: userData.city,
      district: userData.district,
      fullAddress: userData.fullAddress,
      mobile: userData.mobile,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    console.log('✅ Buyer registration data saved successfully');
    return true;
  } catch (error) {
    console.error('❌ Error saving buyer registration:', error);
    throw error;
  }
};