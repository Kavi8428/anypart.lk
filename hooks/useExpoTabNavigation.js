// hooks/useExpoTabNavigation.js
import { useRouter, usePathname } from 'expo-router';

export const useExpoTabNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const routeMap = {
    'Categories': '/categories',
    'Chats': '/chat',
    'Home': '/',
    'Cart': '/cart',
    'User': '/user',
  };

  const getCurrentTab = () => {
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
      case '/user':
        return 'User';
      default:
        return 'Home';
    }
  };

  const handleTabChange = (tabName, tabIndex) => {
    const route = routeMap[tabName];
    
    if (route && pathname !== route) {
      console.log(`Navigating to ${tabName} (${route})`);
      
      // You can use different navigation methods:
      router.push(route);      // Add to history stack
      // router.replace(route);   // Replace current route
      // router.navigate(route);  // Navigate (default behavior)
    } else {
      console.log(`Already on ${tabName} tab`);
    }
  };

  return {
    handleTabChange,
    currentTab: getCurrentTab(),
    pathname,
    router,
  };
};