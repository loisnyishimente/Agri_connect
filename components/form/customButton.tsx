import { router, Link, useSegments } from "expo-router";
import React from "react";
import { Button } from "react-native-paper";
import { StyleSheet, Text, ViewStyle } from "react-native";

interface CustomButtonProps {
  href?: string; // Keep href as a string but validate before usage
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

export default function CustomButton({ href, buttonText, onPress, style }: CustomButtonProps) {
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
    if (href) {
      try {
        router.push(href as any); // Bypass strict type checking
      } catch (error) {
        console.error("Invalid navigation path:", error);
      }
    }
  };

  if (href) {
    return (
      <Link href={href as any} asChild>
        <Button mode="contained" style={[styles.button, style]}>
          <Text style={styles.text}>{buttonText}</Text>
        </Button>
      </Link>
    );
  }

  return (
    <Button mode="contained" onPress={handlePress} style={[styles.button, style]}>
      <Text style={styles.text}>{buttonText}</Text>
    </Button>
  );
}
