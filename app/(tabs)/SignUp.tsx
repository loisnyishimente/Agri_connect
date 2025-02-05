import { Image, Pressable, StyleSheet, Alert, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import CustomInput from "@/components/form/customInput";
import CustomButton from "@/components/form/customButton";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import axios from 'axios';
import { View } from "@/components/View";
import { Text } from "@/components/Text";

const Signup = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignup = async () => {
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
     
      const response = await axios.post('http://localhost:8080/api/users/register', {
        fullName,
        email,
        password,
        role: "farmer",  
        region
      });

      if (response.data.success) {
        Alert.alert("Success", "Signup successful!");
        router.push("/Login"); 
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred during signup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="w-full">
      <View className="h-40 bg-[#026338]"></View>
      <View className="rounded-t-3xl h-screen absolute top-32 px-4 py-8">
        <View className="flex flex-row justify-center py-4">
          <Text className="font-extrabold text-3xl">Agri</Text>
          <Text className="text-[#026338] font-extrabold text-3xl">Connect</Text>
        </View>
        <View>
          <Text className="text-[#0e244e9e] font-bold text-lg text-center">
            Welcome...
          </Text>
          <Text className="text-gray-600 font-bold text-sm text-center py-2">
            Create an account to get started
          </Text>
        </View>
        <View>
          <View className="py-4">
            <CustomInput
              left={<TextInput.Icon icon="account" />}
              label="Full Name"
              value={fullName}
              onChangeText={setFullName}
            />
            <CustomInput
              left={<TextInput.Icon icon="mail" />}
              label="Email"
              value={email}
              onChangeText={setEmail}
            />
            <CustomInput
              left={<TextInput.Icon icon="lock" />}
              label="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <CustomInput
              left={<TextInput.Icon icon="lock" />}
              label="Confirm Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <CustomInput
              left={<TextInput.Icon icon="map" />}
              label="Region"
              value={region}
              onChangeText={setRegion}
            />
          </View>

          <View className="py-3">
            <CustomButton buttonText="Sign Up" onPress={handleSignup} />
          </View>

          {loading && <ActivityIndicator size="large" color="#026338" />}

          <View className="flex flex-row items-center gap-x-2">
            <View className="h-[1px] w-[45%] bg-gray-200"></View>
            <Text>OR</Text>
            <View className="h-[1px] w-[45%] bg-gray-200"></View>
          </View>

          <View>
            <TouchableOpacity
              className="py-4 border-[1px] w-full flex m-auto border-gray-200 rounded-lg mt-4 mb-2"
              onPress={() => console.log("Google signup pressed")}
            >
              <View className="flex flex-row justify-center gap-2 bg-transparent">
                <Image source={{ uri: '../../Images/google.png' }} style={{ height: 20, width: 20 }} />
                <Text className="text-center text-[#026338]">
                  Sign Up with Google
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              className="py-4 border-[1px] w-full flex m-auto border-gray-200 rounded-lg mt-2 mb-2"
              onPress={() => console.log("Facebook signup pressed")}
            >
              <View className="flex flex-row justify-center gap-2 bg-transparent">
                <Image source={{ uri: '../../Images/facebook.png' }}  style={{ height: 20, width: 20 }} />
                <Text className="text-center text-[#626262]">
                  Sign Up with Facebook
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View className="flex flex-row py-4 justify-center">
            <Text>Already have an account?</Text>
            <Pressable onPress={() => router.push("./login")}>
              <Text className="text-[#026338]">Login</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({});
