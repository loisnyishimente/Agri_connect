// screens/SignUp.tsx

import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View } from "@/components/View";
import { Text } from "@/components/Text";
import CustomInput from "@/components/form/customInput";
import CustomButton from "@/components/form/customButton";
import { StackParamList } from "@/components/navigation/StackNavigator";

const SignUp = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!fullName || !email || !password || !confirmPassword || !region) {
      Alert.alert("Error", "Please fill all the fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const user = {
        fullName,
        email,
        password,
        role: "farmer",
        region,
      };

      await AsyncStorage.setItem("user", JSON.stringify(user));

      Alert.alert("Success", "Registration complete!");
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      Alert.alert("Error", "An error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <View style={styles.formContainer}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Agri</Text>
          <Text style={[styles.logoText, styles.logoHighlight]}>Connect</Text>
        </View>
        <Text style={styles.welcomeText}>Welcome...</Text>
        <Text style={styles.subText}>Create an account to get started</Text>

        <View style={styles.formFields}>
          <CustomInput
            left={<TextInput.Icon icon="account" />}
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
          <CustomInput
            left={<TextInput.Icon icon="email" />}
            label="Email"
            value={email}
            onChangeText={setEmail}
          />
          <CustomInput
            left={<TextInput.Icon icon="lock" />}
            label="Password"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />
          <CustomInput
            left={<TextInput.Icon icon="lock" />}
            label="Confirm Password"
            value={confirmPassword}
            secureTextEntry
            onChangeText={setConfirmPassword}
          />
          <CustomInput
            left={<TextInput.Icon icon="map" />}
            label="Region"
            value={region}
            onChangeText={setRegion}
          />
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton buttonText="Sign Up" onPress={handleSignUp} />
          {loading && <ActivityIndicator size="large" color="#026338" />}
        </View>

        <View style={styles.orContainer}>
          <View style={styles.divider} />
          <Text>OR</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.socialLoginContainer}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => console.log("Google signup pressed")}
          >
            <View style={styles.socialButtonContent}>
              <Image source={require('../../Images/google.png')} style={styles.socialIcon} />
              <Text style={styles.socialButtonText}>Sign Up with Google</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => console.log("Facebook signup pressed")}
          >
            <View style={styles.socialButtonContent}>
              <Image source={require('../../Images/facebook.png')} style={styles.socialIcon} />
              <Text style={styles.socialButtonText}>Sign Up with Facebook</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.loginPromptContainer}>
          <Text>Already have an account?</Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginText}>Login</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%" },
  header: { height: 160, backgroundColor: "#026338" },
  formContainer: {
    position: "absolute",
    top: 160,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 16,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "800",
  },
  logoHighlight: {
    color: "#026338",
  },
  welcomeText: {
    fontSize: 18,
    color: "#0e244e9e",
    fontWeight: "bold",
    textAlign: "center",
  },
  subText: {
    fontSize: 14,
    color: "#626262",
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 8,
  },
  formFields: {
    paddingBottom: 16,
  },
  buttonContainer: {
    paddingVertical: 16,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  divider: {
    height: 1,
    width: "40%",
    backgroundColor: "#E6E8EE",
  },
  socialLoginContainer: {
    paddingVertical: 16,
  },
  socialButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E6E8EE",
    borderRadius: 8,
    marginBottom: 12,
  },
  socialButtonContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  socialIcon: {
    height: 20,
    width: 20,
    marginRight: 8,
  },
  socialButtonText: {
    color: "#026338",
    fontSize: 14,
    fontWeight: "600",
  },
  loginPromptContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 12,
  },
  loginText: {
    color: "#026338",
    fontWeight: "600",
    marginLeft: 4,
  },
});
