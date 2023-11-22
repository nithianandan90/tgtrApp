import {Pressable, StyleSheet, Text, View, PressableProps} from 'react-native';
import React from 'react';

interface IButton extends PressableProps {
  text?: string;
  onPress?: () => void;
  inline?: boolean;
}

const Button = ({
  text = '',
  onPress = () => {},
  inline,
  ...restProps
}: IButton) => {
  return (
    <Pressable
      {...restProps}
      style={[styles.container, inline ? {flex: 1} : {}]}
      onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',

    margin: 5,
  },
  text: {
    color: 'black',
    fontWeight: '600',
  },
});
