import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAuthContext} from '../../contexts/AuthContext';
import {useChatContext} from '../../contexts/ChatContext';
import Button from '../../components/Button/Button';

const ProfileScreen = () => {
  const {handleSignOut} = useAuthContext();

  const signOut = async () => {
    handleSignOut();
  };

  return (
    <View>
      <Button onPress={signOut} text="Sign Out" />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
