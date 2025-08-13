import { StyleSheet, Text, View } from 'react-native'
import MainTheme from '../../components/ui/theme/main/Layout'

const Home = () => {
  console.log('Home component rendered')
  return (
    <MainTheme
      footerButtons={['Categories', 'Chats', 'Home', 'Cart', 'User']}
      headerTitle='OTP Verification'
    >
      <View>
        <Text>Home</Text>
      </View>
    </MainTheme>
  )
}

export default Home

const styles = StyleSheet.create({})
