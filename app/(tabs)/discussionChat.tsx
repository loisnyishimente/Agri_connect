import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, KeyboardAvoidingView, Platform, TouchableOpacity, Keyboard, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import userImage from '../../Images/profile.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Message = {
  id: string;
  text: string;
  sender: string;
  senderRole: string;
  createdAt: string;
  senderImage: string;
};

const CommunityChatScreen = ({ navigation }: { navigation: any }) => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [fullName, setUserFullName] = useState<string>(''); 
  const [role, setUserRole] = useState<string>('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userFullName = await AsyncStorage.getItem('user');
        const userRole = await AsyncStorage.getItem('role'); 

        if (userFullName) setUserFullName(userFullName); 
        if (userRole) setUserRole(userRole);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    const loadMessages = async () => {
      try {
        const storedMessages = await AsyncStorage.getItem('messages');
        if (storedMessages) {
          setMessages(JSON.parse(storedMessages));
        } else {
          // Add default messages if none are stored
          const defaultMessages = [
            {
              id: '1',
              text: 'Hello, welcome to the forum!',
              sender: 'Alice',
              senderRole: 'Admin',
              createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              senderImage: 'https://randomuser.me/api/portraits/men/1.jpg',
            },
            {
              id: '2',
              text: 'Good morning everyone!',
              sender: 'Bob',
              senderRole: 'Farmer',
              createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              senderImage: 'https://randomuser.me/api/portraits/women/2.jpg',
            },
            {
              id: '3',
              text: 'Does anyone have advice on crop rotation?',
              sender: 'Charlie',
              senderRole: 'Farmer',
              createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              senderImage: 'https://randomuser.me/api/portraits/men/3.jpg',
            },
          ];
          setMessages(defaultMessages);
          await AsyncStorage.setItem('messages', JSON.stringify(defaultMessages));
        }
      } catch (error) {
        console.error('Error loading messages', error);
      }
    };

    fetchUserData();
    loadMessages();
  }, []);

  const handleSendMessage = async () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: message,
        sender: fullName || 'unknown', // If fullName is not fetched, fallback to 'unknown'
        senderRole: role || 'Farmer', // Default role for now
        senderImage: userImage, // Replace with the logged-in user's image
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      const updatedMessages = [newMessage, ...messages];
      
      // Save messages to AsyncStorage
      try {
        await AsyncStorage.setItem('messages', JSON.stringify(updatedMessages));
        setMessages(updatedMessages);
      } catch (error) {
        console.error('Error saving messages', error);
      }

      setMessage('');
      Keyboard.dismiss();
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageContainer, item.sender === fullName && styles.userMessage]}>
      <View style={styles.messageHeader}>
        {/* Display profile image for other users */}
        {item.sender !== fullName && (
          <Image source={typeof item.senderImage === 'string' ? { uri: item.senderImage } : item.senderImage} style={styles.profileImage} />
        )}
        <View style={styles.messageHeaderText}>
          {/* Display only name for the logged-in user */}
          <Text style={[styles.sender, item.sender === fullName && styles.userSender]}>
            {item.sender === fullName ? fullName : item.sender}
          </Text>
          {/* Display role for non-logged-in users */}
          {item.sender !== fullName && (
            <Text style={[styles.senderRole, item.sender === fullName && styles.userSenderRole]}>
              {item.senderRole}
            </Text>
          )}
        </View>
      </View>
      <Text style={[styles.messageText, item.sender === fullName && styles.userMessageText]}>{item.text}</Text>
      <Text style={styles.timestamp}>{item.createdAt}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Forum Chat</Text>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        inverted
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#026338',
    padding: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    marginLeft: 10,
  },
  messageContainer: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  userMessage: {
    backgroundColor: '#026338',
    borderRadius: 10,
  },
  userMessageText: {
    color: 'white', 
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  messageHeaderText: {
    flexDirection: 'column',
  },
  sender: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#026338', 
  },
  senderRole: {
    fontSize: 12,
    color: '#026338', 
  },
  userSender: {
    color: 'white', 
  },
  userSenderRole: {
    color: 'white', 
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#026338',
    padding: 10,
    borderRadius: 20,
  },
});

export default CommunityChatScreen;
