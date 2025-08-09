import React, { useState } from 'react';
import { View, Text, TextInput, Modal, Image } from 'react-native';
import { Button } from '@rneui/base';
import RegSelection from '../../assets/images/sendOTP.gif';

const Dialog = ({ visible, title, message, onConfirm, onCancel, inputPlaceholder, inputValue, setInputValue, leftBtn = 'Cancel', rightBtn = 'Confirm' }) => {
  const [localInput, setLocalInput] = useState(inputValue || '');

  const handleConfirm = () => {
    if (setInputValue) {
      setInputValue(localInput);
    }
    onConfirm(localInput);
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white p-5 rounded-lg w-4/5 items-center">
          <Image
            source={RegSelection}
            className="w-24 h-24 mb-3.5"
            resizeMode="contain"
          />
          <Text className="text-base text-center mb-3.5">{message}</Text>
          {inputPlaceholder && (
            <TextInput
              className="border border-gray-300 rounded-md p-2 mb-3.5 w-full text-center"
              placeholder={inputPlaceholder}
              value={localInput}
              onChangeText={setLocalInput}
              keyboardType="numeric"
              maxLength={4}
            />
          )}
          <View className="flex-row justify-between w-full">
            <Button
              title={leftBtn}
              onPress={onCancel}
              buttonStyle={{ backgroundColor: 'transparent', borderRadius: 6, borderColor: 'orange', borderWidth: 2, paddingHorizontal: 16, paddingVertical: 8 }}
              titleStyle={{ color: 'black', fontWeight: '400' }}
            />
            <Button
              title={rightBtn}
              onPress={handleConfirm}
              buttonStyle={{ backgroundColor: 'transparent', borderRadius: 6, borderColor: 'orange', borderWidth: 2, paddingHorizontal: 16, paddingVertical: 8 }}
              titleStyle={{ color: 'black', fontWeight: '400' }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Dialog;