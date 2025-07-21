import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'


const DisplayAnImage = ({width , height}) => (
       <Image
    style={[{ width, height }]}
    source={require('../../assets/images/static-logo.png')}
  />
)
export default DisplayAnImage
