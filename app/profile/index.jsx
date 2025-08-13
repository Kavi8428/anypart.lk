import { StyleSheet, Text, View } from 'react-native'
import MainTheme from '../../components/ui/theme/main/Layout'

const Profile = () => {
  console.log('Profile component rendered')
  return (
    <MainTheme
      headerTitle=''
      activeTab='Profile'
    >
      <View>
        <Text>Profile</Text>
      </View>
    </MainTheme>
  )
}

export default Profile

const styles = StyleSheet.create({})