import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { 
  Menu, 
  MessageCircle, 
  Home, 
  ShoppingCart, 
  User 
} from 'lucide-react-native';

const Footer = ({ buttons = [], onTabChange, activeTab = 'Home' }) => {
  const getIcon = (button) => {
    const iconProps = {
      size: 24,
      color: button === activeTab ? '#3B82F6' : '#FFFFFF', // Blue for active, white for inactive
    };

    switch (button.toLowerCase()) {
      case 'categories':
        return <Menu {...iconProps} />;
      case 'chat':
        return <MessageCircle {...iconProps} />;
      case 'home':
        return <Home {...iconProps} />;
      case 'cart':
        return <ShoppingCart {...iconProps} />;
      case 'profile':
        return <User {...iconProps} />;
      default:
        return null;
    }
  };

  const handleTabPress = (button, index) => {
    if (onTabChange && typeof onTabChange === 'function') {
      onTabChange(button, index);
    }
    console.log(`${button} tab pressed`);
  };

  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingVertical: 2,
      paddingHorizontal: 8,
      backgroundColor: '#FF6B35', // Orange background
      borderTopWidth: 0,
    }}>
      {buttons.map((button, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleTabPress(button, index)}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 8,
          }}
          activeOpacity={0.7}
        >
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: button === activeTab ? '#FFFFFF' : 'transparent',
            borderRadius: button === activeTab ? 12 : 0,
            paddingHorizontal: button === activeTab ? 16 : 8,
            paddingVertical: button === activeTab ? 8 : 4,
            minWidth: button === activeTab ? 80 : 'auto', 
          }}>
            {getIcon(button)}
            <Text style={{
              color: button === activeTab ? '#3B82F6' : '#FFFFFF',
              fontSize: 10,
              fontWeight: button === activeTab ? '600' : '500',
              marginTop: 4,
              textAlign: 'center',
            }}>
              {button.toUpperCase()}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Footer;