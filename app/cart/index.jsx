// app/cart/index.jsx
import { StyleSheet, Text, View } from 'react-native';
import MainTheme from '../../components/ui/theme/main/Layout';
import { useExpoTabNavigation } from '../../hooks/useExpoTabNavigation';

const Cart = () => {
  const { currentTab } = useExpoTabNavigation();

  return (
    <MainTheme
      headerTitle='Shopping Cart'
      activeTab={currentTab} // Use hook's current tab
    >
      <View style={styles.container}>
        <Text style={styles.title}>Your Cart</Text>
        <Text style={styles.subtitle}>Cart items will appear here</Text>
      </View>
    </MainTheme>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});