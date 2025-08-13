import React from 'react';
import { View } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import Header from './Header';
import Footer from './Footer';

const MainTheme = ({ 
  children, 
  headerTitle, 
  activeTab 
}) => {
  const footerButtons = ['Categories', 'Chat', 'Home', 'Cart', 'Profile'];
  const router = useRouter();
  const pathname = usePathname();

  // Map button names to routes
  const routeMap = {
    'Categories': '/categories',
    'Chat': '/chat',
    'Home': '/home',
    'Cart': '/cart',
    'Profile': '/profile',
  };

  // Get current active tab from pathname
  const getCurrentTab = () => {
    if (activeTab) return activeTab;
    
    // Auto-detect from pathname
    switch (pathname) {
      case '/categories':
        return 'Categories';
      case '/chat':
        return 'Chats';
      case '/':
      case '/home':
        return 'Home';
      case '/cart':
        return 'Cart';
      case '/profile':
        return 'User';
      default:
        return 'Home';
    }
  };

  const handleTabChange = (tabName, tabIndex) => {
    const route = routeMap[tabName];
    
    if (route && pathname !== route) {
      console.log(`Navigating to ${tabName} (${route})`);
      router.push(route);
    } else {
      console.log(`Already on ${tabName} tab`);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Header title={headerTitle} />
      <View className="flex-1 p-6 rounded-t-3xl bg-white">
        {children}
      </View>
      <Footer 
        buttons={footerButtons} 
        onTabChange={handleTabChange}
        activeTab={getCurrentTab()}
      />
    </View>
  );
};

export default MainTheme;