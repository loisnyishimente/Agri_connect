import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Message {
  id: string;
  sender: string;
  senderImage: string;
  senderRole: string;
  text: string;
  createdAt: string;
}

const ChatScreen = () => {
  const [fullName, setUserFullName] = useState<string>('');
  const [userRole, setUserRole] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'John Doe',
      senderImage: 'https://via.placeholder.com/40',
      senderRole: 'Admin',
      text: 'Hello! How are you?',
      createdAt: '10:30 AM',
    },
    {
      id: '2',
      sender: 'Jane Smith',
      senderImage: 'https://via.placeholder.com/40',
      senderRole: 'User',
      text: 'I am doing great! What about you?',
      createdAt: '10:32 AM',
    },
  ]);

  // Fetch and filter user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');

        if (userData) {
          const parsedData = JSON.parse(userData);
          setUserFullName(parsedData.name || 'Guest');
          setUserRole(parsedData.role || 'Farmer');
        } else {
          setUserFullName('Guest');
          setUserRole('Farmer');
        }
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, []);

  // Render each message
  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageContainer, item.sender === fullName && styles.userMessage]}>
      <View style={styles.messageHeader}>
        {item.sender !== fullName && (
          <Image source={{ uri: item.senderImage }} style={styles.profileImage} />
        )}
        <View style={styles.messageHeaderText}>
          <Text style={[styles.sender, item.sender === fullName && styles.userSender]}>
            {item.sender === fullName ? fullName : item.sender}
          </Text>
          {item.sender !== fullName && (
            <Text style={styles.senderRole}>{item.senderRole}</Text>
          )}
        </View>
      </View>
      <Text style={[styles.messageText, item.sender === fullName && styles.userMessageText]}>
        {item.text}
      </Text>
      <Text style={styles.timestamp}>{item.createdAt}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    padding: 10,
  },
  messageContainer: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  messageHeaderText: {
    marginLeft: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  sender: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  senderRole: {
    fontSize: 12,
    color: 'gray',
  },
  userSender: {
    color: '#007AFF',
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: '#000',
  },
  timestamp: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
});

export default ChatScreen;
