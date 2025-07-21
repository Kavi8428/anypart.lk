import React from 'react';
import { View, Text, Image } from 'react-native';
import { Overlay, Button } from '@rneui/base';
import { Wrench } from 'lucide-react-native';

const OverlayComponent = ({ visible, toggleOverlay, onBuyPress, onSellPress }) => {
  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={toggleOverlay}
      overlayStyle={{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        width: '80%',
        maxHeight: '70%',
      }}
    >
      <Image
        source={require('../../assets/images/selection.gif')}
        style={{ width: 200, height: 150, alignSelf: 'center', marginBottom: 16 }}
        resizeMode="contain"
      />
      <Text className="text-center text-2xl font-regular text-gray-800 mb-6">
        You want to
      </Text>
      <View className="flex-row justify-between gap-3 mb-6">
        <Button
          title="Buy Parts"
          onPress={onBuyPress}
          buttonStyle={{
            backgroundColor: 'transparent',
            borderRadius: 12,
            borderColor: '#F97316',
            borderWidth: 2,
            paddingVertical: 10,
            paddingHorizontal: 16,
          }}
          titleStyle={{ color: '#F97316', fontSize: 18, fontWeight: '600', padding: 10 }}
          // icon={<Wrench color="#F97316" size={25} style={{ marginRight: 10 }} />}
          iconPosition="left"
        />
        <Button
          title="Sell Parts"
          onPress={onSellPress}
          buttonStyle={{
            backgroundColor: 'transparent',
            borderRadius: 12,
            borderColor: '#F97316',
            borderWidth: 2,
            paddingVertical: 10,
            paddingHorizontal: 16,
          }}
          titleStyle={{ color: '#F97316', fontSize: 18, fontWeight: '600' }}
          // icon={<Wrench color="#F97316" size={25} style={{ marginRight: 10 }} />}
          iconPosition="left"
        />
      </View>
    </Overlay>
  );
};

export default OverlayComponent;