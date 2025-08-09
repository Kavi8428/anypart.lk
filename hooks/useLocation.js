// hooks/useLocation.js

import { useState, useEffect, useCallback } from 'react';
import {
  fetchDistricts,
  fetchCities,
  fetchCitiesByDistrict,
  fetchDistrictByCity,
  validateCityDistrict as validateCityDistrictAPI,
  searchLocations,
  LocationServiceDev
} from '../services/api/locationService';

/**
 * Custom hook for managing location data and operations
 */
export const useLocation = () => {
  // State management
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [loading, setLoading] = useState({
    districts: false,
    cities: false,
    validation: false
  });
  const [error, setError] = useState(null);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  /**
   * Load districts and cities on component mount
   */
  const loadInitialData = async () => {
    try {
      setLoading(prev => ({ ...prev, districts: true, cities: true }));
      setError(null);

      // Load both districts and cities in parallel
      const [districtsData, citiesData] = await Promise.all([
        loadDistricts(),
        loadCities()
      ]);

      setFilteredCities(citiesData); // Initially show all cities
    } catch (err) {
      setError('Failed to load location data. Please check your connection.');
      console.error('Error loading initial data:', err);
    } finally {
      setLoading(prev => ({ ...prev, districts: false, cities: false }));
    }
  };

  /**
   * Load districts from API or mock data
   */
  const loadDistricts = async () => {
    try {
      let districtsData;
      
      if (LocationServiceDev.useMockData) {
        console.log('Using mock districts data');
        districtsData = LocationServiceDev.getMockDistricts();
      } else {
        districtsData = await fetchDistricts();
      }
      
      setDistricts(districtsData);
      return districtsData;
    } catch (err) {
      console.error('Error loading districts:', err);
      throw err;
    }
  };

  /**
   * Load cities from API or mock data
   */
  const loadCities = async () => {
    try {
      let citiesData;
      
      if (LocationServiceDev.useMockData) {
        console.log('Using mock cities data');
        citiesData = LocationServiceDev.getMockCities();
      } else {
        citiesData = await fetchCities();
      }
      
      setCities(citiesData);
      return citiesData;
    } catch (err) {
      console.error('Error loading cities:', err);
      throw err;
    }
  };

  /**
   * Get cities for a specific district
   */
  const getCitiesForDistrict = useCallback(async (districtId) => {
    if (!districtId) {
      setFilteredCities(cities);
      return cities;
    }

    try {
      setLoading(prev => ({ ...prev, cities: true }));
      
      let districtCities;
      
      if (LocationServiceDev.useMockData) {
        // Filter mock data
        districtCities = cities.filter(city => city.districtId === districtId);
      } else {
        districtCities = await fetchCitiesByDistrict(districtId);
      }
      
      setFilteredCities(districtCities);
      return districtCities;
    } catch (err) {
      setError('Failed to load cities for selected district.');
      console.error('Error getting cities for district:', err);
      return [];
    } finally {
      setLoading(prev => ({ ...prev, cities: false }));
    }
  }, [cities]);

  /**
   * Get district for a specific city
   */
  const getDistrictForCity = useCallback(async (cityId) => {
    if (!cityId) return null;

    try {
      setLoading(prev => ({ ...prev, validation: true }));
      
      let district;
      
      if (LocationServiceDev.useMockData) {
        // Find district from mock data
        const city = cities.find(c => c.value === cityId);
        if (city) {
          district = districts.find(d => d.value === city.districtId);
        }
      } else {
        district = await fetchDistrictByCity(cityId);
      }
      
      return district || null;
    } catch (err) {
      console.error('Error getting district for city:', err);
      return null;
    } finally {
      setLoading(prev => ({ ...prev, validation: false }));
    }
  }, [cities, districts]);

  /**
   * Validate city-district relationship
   */
  const validateCityDistrict = useCallback(async (cityId, districtId) => {
    if (!cityId || !districtId) return false;

    try {
      if (LocationServiceDev.useMockData) {
        const city = cities.find(c => c.value === cityId);
        return city ? city.districtId === districtId : false;
      } else {
        return await validateCityDistrictAPI(cityId, districtId);
      }
    } catch (err) {
      console.error('Error validating city-district:', err);
      return false;
    }
  }, [cities]);

  /**
   * Search locations by text
   */
  const searchLocationsByText = useCallback(async (searchText, type = 'all') => {
    if (!searchText || searchText.length < 2) return [];

    try {
      if (LocationServiceDev.useMockData) {
        const allData = [...cities, ...districts];
        return allData.filter(item => 
          item.label.toLowerCase().includes(searchText.toLowerCase())
        );
      } else {
        return await searchLocations(searchText, type);
      }
    } catch (err) {
      console.error('Error searching locations:', err);
      return [];
    }
  }, [cities, districts]);

  /**
   * Refresh location data
   */
  const refreshLocationData = useCallback(async () => {
    await loadInitialData();
  }, []);

  /**
   * Reset filtered cities to show all
   */
  const resetCityFilter = useCallback(() => {
    setFilteredCities(cities);
  }, [cities]);

  /**
   * Get location statistics
   */
  const getLocationStats = useCallback(() => {
    return {
      totalDistricts: districts.length,
      totalCities: cities.length,
      filteredCities: filteredCities.length
    };
  }, [districts.length, cities.length, filteredCities.length]);

  // Return hook interface
  return {
    // Data
    districts,
    cities,
    filteredCities,
    
    // Loading states
    loading,
    error,
    
    // Methods
    getCitiesForDistrict,
    getDistrictForCity,
    validateCityDistrict,
    searchLocationsByText,
    refreshLocationData,
    resetCityFilter,
    getLocationStats,
    
    // Utilities
    clearError: () => setError(null),
    isLoading: Object.values(loading).some(Boolean)
  };
};

/**
 * Hook for location form management (specific to registration forms)
 */
export const useLocationForm = () => {
  const location = useLocation();
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [errors, setErrors] = useState({ city: '', district: '' });

  /**
   * Handle city selection with auto-district detection
   */
  const handleCityChange = async (cityId) => {
    setSelectedCity(cityId);
    setErrors(prev => ({ ...prev, city: '' }));

    if (cityId) {
      const district = await location.getDistrictForCity(cityId);
      if (district) {
        setSelectedDistrict(district.value);
        setErrors(prev => ({ ...prev, district: '' }));
      }
    } else {
      setSelectedDistrict('');
    }
  };

  /**
   * Handle district selection with city filtering
   */
  const handleDistrictChange = async (districtId) => {
    setSelectedDistrict(districtId);
    setErrors(prev => ({ ...prev, district: '' }));

    if (districtId) {
      await location.getCitiesForDistrict(districtId);
      
      // Reset city if it doesn't belong to new district
      if (selectedCity) {
        const isValid = await location.validateCityDistrict(selectedCity, districtId);
        if (!isValid) {
          setSelectedCity('');
        }
      }
    } else {
      location.resetCityFilter();
    }
  };

  /**
   * Validate form data
   */
  const validateForm = async () => {
    const newErrors = { city: '', district: '' };
    let isValid = true;

    if (!selectedCity) {
      newErrors.city = 'City is required';
      isValid = false;
    }

    if (!selectedDistrict) {
      newErrors.district = 'District is required';
      isValid = false;
    }

    if (selectedCity && selectedDistrict) {
      const isValidCombination = await location.validateCityDistrict(selectedCity, selectedDistrict);
      if (!isValidCombination) {
        newErrors.city = 'Selected city does not belong to the selected district';
        newErrors.district = 'Selected district does not contain the selected city';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  /**
   * Reset form
   */
  const resetForm = () => {
    setSelectedCity('');
    setSelectedDistrict('');
    setErrors({ city: '', district: '' });
    location.resetCityFilter();
  };

  return {
    ...location,
    selectedCity,
    selectedDistrict,
    errors,
    handleCityChange,
    handleDistrictChange,
    validateForm,
    resetForm,
    setSelectedCity,
    setSelectedDistrict
  };
};