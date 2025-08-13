import { StyleSheet, Text, View } from 'react-native'
import MainTheme from '../../components/ui/theme/main/Layout'

const Chat = () => {
  console.log('Chat component rendered')
  return (
    <MainTheme
      headerTitle=''
      activeTab='Chat'
    >
      <View>
        <Text>Chat</Text>
      </View>
    </MainTheme>
  )
}

export default Chat

const styles = StyleSheet.create({})