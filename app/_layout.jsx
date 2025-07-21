import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'
import './global.css'

const CustomHeader = () => {
  return (
    <View className='bg-orange-500 p-4'>
      {/* <Text className='text-white text-2xl font-bold text-center'>
        Buyer Registration
      </Text> */}
    </View>
  )
}
const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}
    >
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='welcome/index' options={{ headerShown: false }} />
      <Stack.Screen
        name='buyer-reg/index'
        options={{
          headerShown: true,
          header: () => <CustomHeader />,
          headerBackVisible: false // Ensures no back arrow
        }}
      />
    </Stack>
  )
}

export default RootLayout

const styles = StyleSheet.create({})
