import { Image, Pressable, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
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


const Login = () => {

  type NavigationProps = NativeStackNavigationProp<StackParamList, "Main">;
  const navigation = useNavigation<NavigationProps>();
  const handleSignIn = () => {
    navigation.navigate("Main");
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
            style={styles.input}
          />
          <CustomInput
            left={<TextInput.Icon icon="lock" />}
            label="Password"
            style={styles.input}
          />
        </View>
        <CustomButton
          buttonText="Sign In"
          style={styles.signInButton}
          onPress={handleSignIn} // Attach the navigation logic here
        />
        <View style={styles.orContainer}>
          <View style={styles.separator}></View>
          <Text>OR</Text>
          <View style={styles.separator}></View>
        </View>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => console.log("pressed")}
        >
          <View style={styles.socialButtonContent}>
            <Image source={{ uri: '../../Images/google.png' }} style={styles.socialIcon} />
            <Text style={styles.socialText}>Login with Google</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => console.log("pressed")}
        >
          <View style={styles.socialButtonContent}>
            <Image source={{ uri: '../../Images/facebook.png' }} style={styles.socialIcon} />
            <Text style={styles.socialText}>Login with Facebook</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
        <View style={styles.registerContainer}>
          <Text>Don't have an account?</Text>
          <Pressable onPress={() => router.push("/SignUp")}>
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
  socialIcon: {
    height: 20,
    width: 20,
    marginRight: 8,
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
