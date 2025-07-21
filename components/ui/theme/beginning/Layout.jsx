import React from 'react';
import { View } from 'react-native';
import Header from './Header';
import Footer from './Footer';

const BeginningTheme = ({ children, footerButtons, headerTitle }) => {
  return (
    <View className="flex-1  bg-orange-500">
      <Header title={headerTitle} />
      <View className="flex-1 p-6 rounded-t-3xl bg-white">
        {children}
      </View>
      <Footer buttons={footerButtons} />
    </View>
  );
};

export default BeginningTheme;