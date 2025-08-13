import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'
import './global.css'

const CustomHeader = () => {
  return (
    <View className='bg-primary p-4'>
      {/* <Text className="text-white text-2xl font-bold text-center">
        Buyer Registration
      </Text> */}
    </View>
  )
}

const CustomLayout = ({ children }) => {
  return (
    <View style={{ flex: 1 }}>
      <div id='recaptcha-container' />
      {children}
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
      <Stack.Screen
        name='auth/welcome/index'
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='auth/buyer-reg/index'
        options={{
          headerShown: true,
          header: () => <CustomHeader />,
          headerBackVisible: false
        }}
      />
      <Stack.Screen
        name='auth/otp/index'
        options={{
          headerShown: true,
          header: () => <CustomHeader />,
          headerBackVisible: false
        }}
      />
      <Stack.Screen
        name='home/index'
        options={{
          headerShown: true,
          header: () => <CustomHeader />,
          headerBackVisible: false
        }}
      />

      <Stack.Screen
        name='chat/index'
        options={{
          headerShown: true,
          header: () => <CustomHeader />,
          headerBackVisible: false
        }}
      />

      <Stack.Screen
        name='categories/index'
        options={{
          headerShown: true,
          header: () => <CustomHeader />,
          headerBackVisible: false
        }}
      />

      <Stack.Screen
        name='cart/index'
        options={{
          headerShown: true,
          header: () => <CustomHeader />,
          headerBackVisible: false
        }}
      />
      <Stack.Screen
        name='profile/index'
        options={{
          headerShown: true,
          header: () => <CustomHeader />,
          headerBackVisible: false
        }}
      />
    </Stack>
  )
}

export default RootLayout

const styles = StyleSheet.create({})
