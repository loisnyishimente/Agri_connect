import { Image, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TextInput } from "react-native-paper";
import CustomInput from "@/components/form/customInput";
import CustomButton from "@/components/form/customButton";
import { router } from "expo-router"; // Using the router for navigation
import { View } from "@/components/View";
import { Text } from "@/components/Text";
import { StackParamList } from "../../components/navigation/StackNavigator";

const AdminLogin = () => {
  type NavigationProps = NativeStackNavigationProp<StackParamList, "Main">;
  const navigation = useNavigation<NavigationProps>();

  const handleAdminSignIn = () => {
  
    console.log("Admin Sign-In");
    navigation.navigate("Main");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.mainContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Admin</Text>
          <Text style={[styles.title, styles.highlightedText]}>Login</Text>
        </View>
        <View>
          <Text style={styles.welcomeText}>Welcome, Admin</Text>
          <Text style={styles.signInText}>Sign in with your credentials</Text>
        </View>
        <View style={styles.formContainer}>
          <CustomInput
            left={<TextInput.Icon icon="account" />}
            label="Admin Username"
            style={styles.input}
          />
          <CustomInput
            left={<TextInput.Icon icon="lock" />}
            label="Password"
            secureTextEntry
            style={styles.input}
          />
        </View>
        <CustomButton
          buttonText="Sign In as Admin"
          style={styles.signInButton}
          onPress={handleAdminSignIn} 
        />
        <Text style={styles.forgotPassword}>Forgot password?</Text>
        <View style={styles.registerContainer}>
          <Text>Not an admin?</Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={styles.registerText}>Login as User</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default AdminLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 160,
    backgroundColor: "#8B0000", // Dark red for admin theme
  },
  mainContent: {
    position: "absolute",
    top: 120,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: "#fff",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
  },
  highlightedText: {
    color: "#8B0000", // Dark red for admin login
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0e244e9e",
    textAlign: "center",
  },
  signInText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#626262",
    textAlign: "center",
    paddingVertical: 8,
  },
  formContainer: {
    paddingVertical: 16,
  },
  input: {
    marginBottom: 12,
  },
  signInButton: {
    marginVertical: 12,
    backgroundColor: "#8B0000", // Button color for admin login
  },
  forgotPassword: {
    textAlign: "center",
    color: "#8B0000",
    marginVertical: 8,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 16,
  },
  registerText: {
    color: "#8B0000",
    fontWeight: "700",
    marginLeft: 5,
  },
});
