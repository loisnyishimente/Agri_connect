import { router } from "expo-router";
import React from "react";
import { Button } from "react-native-paper";
import { StyleSheet, Text, ViewStyle, TextStyle } from "react-native";


interface CustomButtonProps {
  href?: string;
  buttonText: string;
  onPress?: () => void; 
  style?: ViewStyle; 
}


const styles = StyleSheet.create({
  button: {
    backgroundColor: "#026338",
    justifyContent: "center",
    height: 50,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default function CustomButton({
  href,
  buttonText,
  onPress,
  style, 
}: CustomButtonProps) {

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
    if (href) {
      router.push(href); 
    }
  };

  return (
    <Button
      mode="contained"
      onPress={handlePress}
      style={[styles.button, style]} // Combine default styles with optional style prop
    >
      <Text style={styles.text}>{buttonText}</Text>
    </Button>
  );
}
