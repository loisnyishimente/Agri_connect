import { Pressable, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomInput from "@/components/form/customInput";
import CustomButton from "@/components/form/customButton";
import { View } from "@/components/View";
import { Text } from "@/components/Text";
import { StackParamList } from "../../components/navigation/StackNavigator";

const Login = () => {
  type NavigationProps = NativeStackNavigationProp<StackParamList, "Main">;
  const navigation = useNavigation<NavigationProps>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");




  const handleSignIn = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");

      if (!userData) {
        Alert.alert("Error", "No user found. Please sign up first.");
        return;
      }

      const storedUser = JSON.parse(userData);
      if (storedUser.email === email && storedUser.password === password) {
        Alert.alert("Success", "Login successful!");
        navigation.replace("Main");
      } else {
        Alert.alert("Error", "Invalid email or password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleAdminLogin = () => {
    navigation.replace("loginAsAdmin");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.mainContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Agri</Text>
          <Text style={[styles.title, styles.highlightedText]}>Connect</Text>
        </View>
        <View>
          <Text style={styles.welcomeText}>Welcome...</Text>
          <Text style={styles.signInText}>Sign In to continue</Text>
        </View>
        <View style={styles.formContainer}>
          <CustomInput
            left={<TextInput.Icon icon="mail" />}
            label="Your Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <CustomInput
            left={<TextInput.Icon icon="lock" />}
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
        </View>
        <CustomButton
          buttonText="Sign In"
          style={styles.signInButton}
          onPress={handleSignIn}
        />
        <View style={styles.orContainer}>
          <View style={styles.separator}></View>
          <Text>OR</Text>
          <View style={styles.separator}></View>
        </View>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={handleAdminLogin}
        >
          <View style={styles.socialButtonContent}>
            <Text style={styles.socialText}>Login as Admin</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.forgotPassword}>Forgot password?</Text>
        <View style={styles.registerContainer}>
          <Text>Don't have an account?</Text>
          <Pressable onPress={() => navigation.push("SignUp")}>
            <Text style={styles.registerText}>Register</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 160,
    backgroundColor: "#026338",
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
    color: "#026338",
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
  },
  orContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  separator: {
    height: 1,
    width: "40%",
    backgroundColor: "#D1D1D1",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D1D1D1",
    borderRadius: 8,
    paddingVertical: 12,
    marginVertical: 8,
  },
  socialButtonContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  socialText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#026338",
  },
  forgotPassword: {
    textAlign: "center",
    color: "#026338",
    marginVertical: 8,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 16,
  },
  registerText: {
    color: "#026338",
    fontWeight: "700",
  },
});
