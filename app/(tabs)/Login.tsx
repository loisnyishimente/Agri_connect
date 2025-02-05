import { Image, Pressable, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { Button, TextInput } from "react-native-paper";
import CustomInput from "@/components/form/customInput";
import CustomButton from "@/components/form/customButton";
import { TouchableOpacity } from "react-native";

import { router } from "expo-router";
import { View } from "@/components/View";
import { Text } from "@/components/Text";

const Login = () => {
  return (
    <View className="w-full ">
      <View className=" h-40 bg-[#026338]"></View>
      <View className="rounded-t-3xl h-screen absolute top-32 px-4 py-8 ">
        <View className="flex flex-row justify-center py-4">
          <Text className=" font-extrabold text-3xl">Agri</Text>
          <Text className="text-[#026338] font-extrabold text-3xl">Connect</Text>
        </View>
        <View>
          <Text className="text-[#0e244e9e] font-bold text-lg text-center">
            Welcome...
          </Text>
          <Text className="text-gray-600 font-bold text-sm text-center py-2">
            Sign In to continue
          </Text>
        </View>
        <View className="">
          <View className="py-4">
            <CustomInput
              left={<TextInput.Icon icon="mail" />}
              label="Your Email"
            />
            <CustomInput
              left={<TextInput.Icon icon="lock" />}
              label="Password"
            />
          </View>
          <View className="py-3">
            <CustomButton href="(tabs)" buttonText="Sign In" />
          </View>
          <View className="flex flex-row items-center gap-x-2">
            <View className="h-[1px] w-[45%] bg-gray-200"></View>
            <Text>OR</Text>
            <View className="h-[1px] w-[45%] bg-gray-200"></View>
          </View>
          <View>
            <TouchableOpacity
              className="py-4 border-[1px] w-full flex m-auto border-gray-200 rounded-lg mt-4 mb-2"
              onPress={() => console.log("pressed")}
            >
              <View className="flex flex-row justify-center gap-2 bg-transparent">
                <Image source={{ uri: '../../Images/google.png' }} style={{ height: 20, width: 20 }} />
                <Text className="text-center text-[#026338">
                  Login with Google
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              className="py-4 border-[1px] w-full flex m-auto border-gray-200 rounded-lg mt-2 mb-2"
              onPress={() => console.log("pressed")}
            >
              <View className="flex flex-row justify-center gap-2 bg-transparent">
                <Image source={{ uri: '../../Images/facebook.png' }} style={{ height: 20, width: 20 }} />
                <Text className="text-center text-[#626262">
                  Login with Facebook
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Text className="text-[#026338] text-center">Forgot password?</Text>
          </View>
          <View className="flex flex-row py-4 justify-center">
            <Text>Don't have account?</Text>
            <Pressable onPress={() => router.push("/SignUp")}>
              <Text className="text-[#026338]">Register</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
