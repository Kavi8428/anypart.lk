import { View, Image, Animated, Easing } from 'react-native'
import DisplayAnImage from '../components/ui/logo'
import { useState, useEffect } from 'react'
import { useRouter } from 'expo-router'
import '../services/firebase/config';

const Index = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [colorAnim] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(colorAnim, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      setLoading(false)
      router.push('/auth/welcome')
    })

    return () => colorAnim.stopAnimation()
  }, [colorAnim, router])

  const backgroundColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FF6200', '#FFA500'],
  })

  return (
    <Animated.View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor,
      }}
    >
      <DisplayAnImage width={400} height={150} />
    </Animated.View>
  )
}

export default Index