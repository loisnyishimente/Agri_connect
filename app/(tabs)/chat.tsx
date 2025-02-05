import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Client } from '@stomp/stompjs';
import { useNavigation } from '@react-navigation/native';

type Message = {
  id: string;
  text: string;
  isSender: boolean;
};

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const navigation = useNavigation();
  const client = useRef<Client | null>(null);

  // Fetch chat history from the backend
  useEffect(() => {
    fetch('http://localhost:8080/api/messages')
      .then((response) => response.json())
      .then((data) => setMessages(data.reverse()))
      .catch((error) => console.error('Error fetching messages:', error));
  }, []);

  // Configure STOMP WebSocket client
  useEffect(() => {
    client.current = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      onConnect: () => {
        console.log('Connected to WebSocket');
        client.current?.subscribe('/topic/messages', (message) => {
          const receivedMessage: Message = JSON.parse(message.body);
          setMessages((prevMessages) => [receivedMessage, ...prevMessages]);
        });
      },
      onStompError: (error) => {
        console.error('Error with STOMP:', error);
      },
    });

    client.current.activate();

    return () => {
      client.current?.deactivate();
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      if (!client.current?.connected) {
        console.error('STOMP client is not connected');
        return;
      }

      const message: Message = {
        id: Date.now().toString(),
        text: newMessage.trim(),
        isSender: true,
      };

      // Send message to the backend
      client.current.publish({
        destination: '/app/chat',
        body: JSON.stringify(message),
      });

      setNewMessage('');
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.isSender ? styles.sender : styles.receiver,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat</Text>
        <Ionicons name="ellipsis-vertical" size={24} color="#FFF" />
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        style={styles.chatBody}
        contentContainerStyle={{ ...styles.chatBodyContent, paddingBottom: 80 }}
        inverted
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          placeholderTextColor="#888"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    height: 60,
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatBody: {
    flex: 1,
  },
  chatBodyContent: {
    padding: 10,
  },
  messageContainer: {
    maxWidth: '75%',
    marginBottom: 10,
    borderRadius: 15,
    padding: 10,
  },
  sender: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  receiver: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    marginBottom: 0,
    borderColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatScreen;
