import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, KeyboardAvoidingView, Platform, TouchableOpacity, Keyboard, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import adminImage from '../../Images/profile.png';
import johnImage from '../../Images/profile.png';
import janeImage from '../../Images/profile.png';
import userImage from '../../Images/profile.png';


type Message = {
  id: string;
  text: string;
  sender: string;
  senderRole: string; // New field for role
  createdAt: string;
  senderImage: string; // New field for profile image
};

const CommunityChatScreen = ({ navigation }: { navigation: any }) => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Welcome to the AgriConnect discussion forum! Feel free to ask anything related to farming.',
      sender: 'Admin',
      senderRole: 'Agronomist',
      senderImage: adminImage, // Example image URL
      createdAt: '10:00 AM',
    },
    {
      id: '2',
      text: 'Can anyone recommend good soil management techniques for maize farming?',
      sender: 'John Doe',
      senderRole: 'Farmer',
      senderImage:johnImage,
      createdAt: '10:05 AM',
    },
    {
      id: '3',
      text: 'Sure, John! You should try crop rotation and composting. It works great!',
      sender: 'Jane Smith',
      senderRole: 'Agronomist',
      senderImage: janeImage,
      createdAt: '10:10 AM',
    },
    {
      id: '4',
      text: 'That sounds useful. I’ll give it a try!',
      sender: 'John Doe',
      senderRole: 'Farmer',
      senderImage: johnImage,
      createdAt: '10:15 AM',
    },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: message,
        sender: 'Lois', // Replace with logged-in user's name
        senderRole: 'Farmer', 
        senderImage:userImage, 
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prevMessages) => [newMessage, ...prevMessages]);
      setMessage('');
      Keyboard.dismiss();
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageContainer, item.sender === 'Lois' && styles.userMessage]}>
      <View style={styles.messageHeader}>
      <Image source={typeof item.senderImage === 'string' ? { uri: item.senderImage } : item.senderImage} style={styles.profileImage} />

        <View style={styles.messageHeaderText}>
          <Text style={styles.sender}>{item.sender}</Text>
          <Text style={styles.senderRole}>{item.senderRole}</Text>
        </View>
      </View>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.timestamp}>{item.createdAt}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Forum Chat</Text>
      </View>

      {/* Message List */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        inverted
      />

      {/* Message Input */}
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
    backgroundColor: '#f4f4f4', // Light background color for farming theme
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#026338', // Earthy green color
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
    backgroundColor: '#026338', // Light green for current user’s messages
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
    color: '#026338', // Dark green for sender's name
  },
  senderRole: {
    fontSize: 12,
    color: '#026338', // Gray color for sender's role
  },
  messageText: {
    fontSize: 16,
    marginBottom: 5,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#ccc',
    paddingLeft: 10,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#026338', // Match header color
    padding: 10,
    borderRadius: 50,
  },
});

export default CommunityChatScreen;
