import { StyleSheet, Text, View } from 'react-native';
import MainTheme from '../../components/ui/theme/main/Layout';

const Categories = () => {
  return (
    <MainTheme
      headerTitle='Categories'
    >
      <View style={styles.container}>
        <Text style={styles.title}>Categories Page</Text>
        <Text style={styles.subtitle}>Browse all categories here</Text>
      </View>
    </MainTheme>
  );
};

export default Categories;

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