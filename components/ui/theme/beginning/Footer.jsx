import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@rneui/base';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

const Footer = ({ buttons = [], handleNext }) => {
  const getIcon = (button, index) => {
    if (index === 0 && button.toLowerCase() === 'previous') {
      return <ChevronLeft size={20} color="#FFFFFF" />;
    }
    if (index === buttons.length - 1 && button.toLowerCase() === 'next') {
      return <ChevronRight size={20} color="#FFFFFF" />;
    }
    return null;
  };

  const handleButtonPress = (button, index) => {
    if (button.toLowerCase() === 'next' && handleNext) {
      handleNext();
      // console.log('Next button pressed', );
    } else {
      console.log(`${button} button pressed`);
    }
  };

  return (
    <View className="flex-row justify-around p-4 bg-transparent border-t border-gray-300">
      {buttons.map((button, index) => (
        <Button
          key={index}
          onPress={() => handleButtonPress(button, index)}
          buttonStyle={{
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: '#FFFFFF',
            borderRadius: 8,
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
          titleStyle={{
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: '600',
          }}
          icon={getIcon(button, index)}
          iconPosition={index === 0 ? 'left' : 'right'}
          title={button}
          containerStyle={{ marginHorizontal: 8 }}
        />
      ))}
    </View>
  );
};

export default Footer;