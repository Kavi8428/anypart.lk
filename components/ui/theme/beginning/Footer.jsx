import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@rneui/base';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

const Footer = ({ buttons = [] }) => {
  // Map button labels to icons for the first and last buttons
  const getIcon = (button, index) => {
    if (index === 0 && button.toLowerCase() === 'previous') {
      return <ChevronLeft size={20} color="#FFFFFF" />;
    }
    if (index === buttons.length - 1 && button.toLowerCase() === 'next') {
      return <ChevronRight size={20} color="#FFFFFF" />;
    }
    return null; // No icon for middle button or unmatched labels
  };

  return (
    <View className="flex-row justify-around p-4 bg-transparent border-t border-gray-300">
      {buttons.map((button, index) => (
        <Button
          key={index}
          onPress={() => console.log(`${button} button pressed`)} // Placeholder action
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