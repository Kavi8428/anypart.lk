import React from 'react';
import { View } from 'react-native';
import Header from './Header';
import Footer from './Footer';

const MainTheme = ({ children, footerButtons, headerTitle, handleNext }) => {
  return (
    <View className="flex-1 bg-white">
      <Header title={headerTitle} />
      <View className="flex-1 p-6 rounded-t-3xl bg-white">
        {children}
      </View>
      <Footer buttons={footerButtons} handleNext={handleNext} />
    </View>
  );
};

export default MainTheme;