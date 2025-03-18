import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../app/(tabs)/Login";
import Signup from "../../app/(tabs)/SignUp";
import CommunityChatScreen from "../../app/(tabs)/discussionChat"
import TabNavigator from "../navigation/TabNavigator";

export type StackParamList = {
  Main: undefined;
  Login: undefined;
  Signup: undefined;
  discussionChat:undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="Login" component={Login} />
 
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="discussionChat" component={CommunityChatScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
