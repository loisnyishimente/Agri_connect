import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../app/(tabs)/Login";
import Signup from "../../app/(tabs)/SignUp";
import CommunityChatScreen from "../../app/(tabs)/discussionChat";
import AdminLogin from "../../app/(tabs)/loginAsAdmin";
import ChatDetailScreen from "../../app/(tabs)/chatDetailScreen";
import TabNavigator from "../navigation/TabNavigator";


export type StackParamList = {
  Main: undefined;
  Login: undefined;
  SignUp: undefined;
  discussionChat:undefined;
  chatDetailScreen: { chatId: string; chatName: string }; 
  loginAsAdmin:undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={Signup} />
      <Stack.Screen name="discussionChat" component={CommunityChatScreen} />
      <Stack.Screen name="chatDetailScreen" component={ChatDetailScreen} />
      <Stack.Screen name="loginAsAdmin" component={AdminLogin} />

    </Stack.Navigator>
  );
};

export default StackNavigator;
