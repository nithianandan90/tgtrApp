import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAuthContext} from '../../contexts/AuthContext';
import {useChatContext} from '../../contexts/ChatContext';

const ProfileScreen = () => {
  const {handleSignOut} = useAuthContext();

  console.log('chat Client', chatClient);

  const signOut = async () => {
    handleSignOut();
  };

  return (
    <View>
      <Text onPress={signOut}>Sign Out</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
