// services/api/locationService.js

import { db } from '../firebase/config';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';

// Base API configuration
const API_CONFIG = {
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'https://api.yourapp.com',
  timeout: 10000,
  retries: 3
};

// Cache configuration
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes
let cachedData = {
  districts: { data: null, timestamp: null },
  cities: { data: null, timestamp: null }
};

/**
 * Check if cached data is still valid
 */
const isCacheValid = (cacheKey) => {
  const cache = cachedData[cacheKey];
  if (!cache.data || !cache.timestamp) return false;
  return Date.now() - cache.timestamp < CACHE_DURATION;
};

/**
 * Set cache data
 */
const setCache = (cacheKey, data) => {
  cachedData[cacheKey] = {
    data,
    timestamp: Date.now()
  };
};

/**
 * Generic API call function with retry logic
 */
const apiCall = async (fetchFunction, retries = API_CONFIG.retries) => {
  try {
    return await fetchFunction();
  } catch (error) {
    if (retries > 0) {
      console.log(`API call failed, retrying... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
      return apiCall(fetchFunction, retries - 1);
    }
    throw error;
  }
};

/**
 * Fetch all districts from Firebase
 */
export const fetchDistricts = async () => {
  try {
    // Check cache first
    if (isCacheValid('districts')) {
      console.log('Returning cached districts');
      return cachedData.districts.data;
    }

    console.log('Fetching districts from Firebase...');
    
    const districtsQuery = query(
      collection(db, 'districts'),
      orderBy('name')
    );
    
    const querySnapshot = await getDocs(districtsQuery);
    const districts = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      districts.push({
        label: data.name,
        value: doc.id,
        // Additional fields you might need
        code: data.code,
        province: data.province
      });
    });

    // Cache the results
    setCache('districts', districts);
    
    return districts;
  } catch (error) {
    console.error('Error fetching districts:', error);
    throw new Error('Failed to fetch districts. Please try again.');
  }
};

/**
 * Fetch all cities from Firebase
 */
export const fetchCities = async () => {
  try {
    // Check cache first
    if (isCacheValid('cities')) {
      console.log('Returning cached cities');
      return cachedData.cities.data;
    }

    console.log('Fetching cities from Firebase...');
    
    const citiesQuery = query(
      collection(db, 'cities'),
      orderBy('name')
    );
    
    const querySnapshot = await getDocs(citiesQuery);
    const cities = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      cities.push({
        label: data.name,
        value: doc.id,
        districtId: data.districtId,
        // Additional fields
        population: data.population,
        coordinates: data.coordinates
      });
    });

    // Cache the results
    setCache('cities', cities);
    
    return cities;
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw new Error('Failed to fetch cities. Please try again.');
  }
};

/**
 * Fetch cities for a specific district
 */
export const fetchCitiesByDistrict = async (districtId) => {
  try {
    if (!districtId) return [];

    console.log(`Fetching cities for district: ${districtId}`);
    
    const citiesQuery = query(
      collection(db, 'cities'),
      where('districtId', '==', districtId),
      orderBy('name')
    );
    
    const querySnapshot = await getDocs(citiesQuery);
    const cities = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      cities.push({
        label: data.name,
        value: doc.id,
        districtId: data.districtId
      });
    });
    
    return cities;
  } catch (error) {
    console.error('Error fetching cities by district:', error);
    throw new Error('Failed to fetch cities for the selected district.');
  }
};

/**
 * Get district information for a specific city
 */
export const fetchDistrictByCity = async (cityId) => {
  try {
    if (!cityId) return null;

    console.log(`Fetching district for city: ${cityId}`);
    
    // First get the city document
    const cityDoc = await getDocs(
      query(collection(db, 'cities'), where('__name__', '==', cityId))
    );
    
    if (cityDoc.empty) {
      throw new Error('City not found');
    }
    
    const cityData = cityDoc.docs[0].data();
    const districtId = cityData.districtId;
    
    // Then get the district document
    const districtDoc = await getDocs(
      query(collection(db, 'districts'), where('__name__', '==', districtId))
    );
    
    if (districtDoc.empty) {
      throw new Error('District not found');
    }
    
    const districtData = districtDoc.docs[0].data();
    
    return {
      label: districtData.name,
      value: districtId
    };
  } catch (error) {
    console.error('Error fetching district by city:', error);
    throw new Error('Failed to fetch district information.');
  }
};

/**
 * Validate city-district relationship
 */
export const validateCityDistrict = async (cityId, districtId) => {
  try {
    if (!cityId || !districtId) return false;

    const cityDoc = await getDocs(
      query(collection(db, 'cities'), where('__name__', '==', cityId))
    );
    
    if (cityDoc.empty) return false;
    
    const cityData = cityDoc.docs[0].data();
    return cityData.districtId === districtId;
  } catch (error) {
    console.error('Error validating city-district:', error);
    return false;
  }
};

/**
 * Search locations by text
 */
export const searchLocations = async (searchText, type = 'all') => {
  try {
    if (!searchText || searchText.length < 2) return [];

    const results = [];
    
    if (type === 'all' || type === 'cities') {
      const citiesQuery = query(
        collection(db, 'cities'),
        where('name', '>=', searchText),
        where('name', '<=', searchText + '\uf8ff'),
        orderBy('name')
      );
      
      const citySnapshot = await getDocs(citiesQuery);
      citySnapshot.forEach((doc) => {
        const data = doc.data();
        results.push({
          label: data.name,
          value: doc.id,
          type: 'city',
          districtId: data.districtId
        });
      });
    }
    
    if (type === 'all' || type === 'districts') {
      const districtsQuery = query(
        collection(db, 'districts'),
        where('name', '>=', searchText),
        where('name', '<=', searchText + '\uf8ff'),
        orderBy('name')
      );
      
      const districtSnapshot = await getDocs(districtsQuery);
      districtSnapshot.forEach((doc) => {
        const data = doc.data();
        results.push({
          label: data.name,
          value: doc.id,
          type: 'district'
        });
      });
    }
    
    return results;
  } catch (error) {
    console.error('Error searching locations:', error);
    throw new Error('Failed to search locations.');
  }
};

/**
 * Clear location cache (useful for force refresh)
 */
export const clearLocationCache = () => {
  cachedData = {
    districts: { data: null, timestamp: null },
    cities: { data: null, timestamp: null }
  };
  console.log('Location cache cleared');
};

/**
 * Development/Testing functions
 */
export const LocationServiceDev = {
  // Use mock data for development
  useMockData: process.env.NODE_ENV === 'development',
  
  // Mock data fallback
  getMockDistricts: () => [
    { label: 'Colombo District', value: 'colombo_district' },
    { label: 'Kandy District', value: 'kandy_district' },
    { label: 'Galle District', value: 'galle_district' }
  ],
  
  getMockCities: () => [
    { label: 'Colombo', value: 'colombo', districtId: 'colombo_district' },
    { label: 'Kandy', value: 'kandy', districtId: 'kandy_district' },
    { label: 'Galle', value: 'galle', districtId: 'galle_district' }
  ]
};