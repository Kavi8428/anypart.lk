import React from 'react'
import { View, Text } from 'react-native'
import DisplayAnImage from '../../logo'

const Header = ({ title = 'Buyer Registration' }) => {
  return (
    <View className='bg-orange-500 p-4'>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <DisplayAnImage
          width={400}
          height={150}
          style={{ borderRadius: 8, overflow: 'hidden' }}
        />
        {/* <DisplayAnImage width={400} height={150} /> */}
      </View>
    </View>
  )
}

export default Header
