import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ChatScreen from '../../app/(tabs)/chat';
import DiscussionScreen from '../../app/(tabs)/discussion';
import KnowledgeScreen from '../../app/(tabs)/knowledge';
import WebinarsScreen from '../../app/(tabs)/webinars';
import MarketplaceScreen from '../../app/(tabs)/marketplace';
import WeatherAlertsScreen from '../../app/(tabs)/weatherAlerts';
import MyDairyScreen from '../../app/(tabs)/myDairy';
import SuccessStoriesScreen from '../../app/(tabs)/successStories';

export type TabParamList = {
  Home: undefined;
  Post: undefined;
  Chat: undefined;
  Profile: undefined;
  Discussion: undefined;
  Knowledge: undefined;
  Webinars: undefined;
  Marketplace: undefined;
  WeatherAlerts: undefined;
  MyDairy: undefined;
  SuccessStories: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Discussion':
              iconName = 'chatbox';
              break;
             
           
          
            case 'Knowledge':
              iconName = 'book';
              break;
             
           
            case 'Webinars':
              iconName = 'videocam';
              break;
            case 'Marketplace':
              iconName = 'cart';
              break;
            case 'WeatherAlerts':
              iconName = 'cloud';
              break;
            case 'MyDairy':
              iconName = 'calendar';
              break;
              case 'Chat':
                iconName = 'chatbubbles';
                break;
            case 'SuccessStories':
              iconName = 'star';
              break;
            default:
              iconName = 'help';
          }
          return <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#026338',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Discussion" component={DiscussionScreen} options={{ title: 'Discussions' }} />
      <Tab.Screen name="Knowledge" component={KnowledgeScreen} options={{ title: 'Knowledge' }} />
      <Tab.Screen name="Webinars" component={WebinarsScreen} options={{ title: 'Webinars' }} />
      <Tab.Screen name="Marketplace" component={MarketplaceScreen} options={{ title: 'Marketplace' }} />
      <Tab.Screen name="WeatherAlerts" component={WeatherAlertsScreen} options={{ title: 'Weather Alerts' }} />
      <Tab.Screen name="MyDairy" component={MyDairyScreen} options={{ title: 'My Diary' }} />
      <Tab.Screen name="Chat" component={ChatScreen} options={{ title: 'Chats', tabBarAccessibilityLabel: 'Open Chats' }} />
      <Tab.Screen name="SuccessStories" component={SuccessStoriesScreen} options={{ title: 'Success Stories' }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
