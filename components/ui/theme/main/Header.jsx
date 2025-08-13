import React from 'react'
import { View, Text } from 'react-native'
import DisplayAnImage from '../../logo'

const Header = ({ title = 'Buyer Registration' }) => {
  return (
    <View className='bg-primary py-2 px-0 rounded-b-full '>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        {/* <DisplayAnImage
          width={400}
          height={150}
          style={{ borderRadius: 8, overflow: 'hidden' }}
        /> */}
        <Text className='text-white text-2xl font-bold'>{title}</Text>

      </View>
    </View>
  )
}

export default Header
