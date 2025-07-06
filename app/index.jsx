import { StyleSheet, Text, View, Image } from 'react-native'
import {Link} from 'expo-router' // Import Link from expo-router
import React from 'react'
import Logo from '../assets/images/static-logo.png' // Adjust the path as necessary


const index = () => {
  return (
    <View style={styles.container}>
        <Image
            source={Logo

            }
            style={{ width: 300, height: 300, resizeMode: 'contain' }}
        />
        <Text style={{ color: '#fff', fontSize: 62, fontWeight: '400', fontFamily: 'Roboto' }}>Welcome</Text>
        <Link href="/home" style={{ color: '#fff', fontSize: 24, fontWeight: '400', fontFamily: 'Roboto' }}>Home</Link>
      {/* <Text>index to tests</Text> */}
    </View>
  )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'center',
        backgroundColor: '#FF6200',
    },
})
