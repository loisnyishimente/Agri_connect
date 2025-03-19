import { router, Link } from "expo-router";
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
        // Ensure that href matches the expected paths
        if (href === "/Main" || href === "/login") {
          router.push(href as any);
        } else {
          console.error("Invalid navigation path:", href);
        }
      } catch (error) {
        console.error("Error navigating:", error);
      }
    }
  };

  // When href is provided, use Link component for navigation
  if (href) {
    return (
      <Link href={href as any}>
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
