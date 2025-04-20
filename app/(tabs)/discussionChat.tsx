import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  StyleSheet,
} from 'react-native';
import { ArrowLeft, Send } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

interface Message {
  id: string;
  sender: string;
  senderRole: string;
  text: string;
  createdAt: string;
}

export default function Chat() {
  const router = useRouter();
  const [fullName, setUserFullName] = useState<string>('');
  const [userRole, setUserRole] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');

  useEffect(() => {
    const loadChatData = async () => {
      const userData = await AsyncStorage.getItem('user');
      const storedMessages = await AsyncStorage.getItem('chatMessages');

      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUserFullName(parsedUser.fullName || 'Guest');
        setUserRole(parsedUser.role || 'User');
      }

      if (storedMessages) {
        const parsedMessages: Message[] = JSON.parse(storedMessages);
        setMessages(parsedMessages);
      }
    };

    loadChatData();
  }, []);

  const handleSend = async () => {
    if (inputText.trim() === '') return;

    const newMessage: Message = {
      id: (messages.length + 1).toString(),
      sender: fullName,
      senderRole: userRole,
      text: inputText,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInputText('');

    await AsyncStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
  };

  const handleGoBack = () => {
    router.back();
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isOwn = item.sender === fullName;
    return (
      <View style={[styles.messageContainer, isOwn ? styles.messageRight : styles.messageLeft]}>
        <View style={[styles.messageBubble, isOwn ? styles.ownMessage : styles.receivedMessage]}>
          <Text style={[styles.senderName, isOwn ? styles.ownText : styles.defaultText]}>
            {item.sender}
            {!isOwn && (
              <Text style={styles.senderRole}> ({item.senderRole})</Text>
            )}
          </Text>
          <Text style={isOwn ? styles.ownText : styles.defaultText}>{item.text}</Text>
          <Text style={[styles.timestamp, isOwn ? styles.ownTimestamp : styles.defaultTimestamp]}>
            {item.createdAt}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <ArrowLeft color="#4B5563" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Chat</Text>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        showsVerticalScrollIndicator={false}
      />

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleSend}
          placeholder="Type your message..."
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Send color="white" size={20} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  messageList: {
    flexGrow: 1,
  },
  messageContainer: {
    marginBottom: 12,
    flexDirection: 'row',
  },
  messageRight: {
    justifyContent: 'flex-end',
  },
  messageLeft: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
    maxWidth: '80%',
  },
  ownMessage: {
    backgroundColor: '#026338/',
  },
  receivedMessage: {
    backgroundColor: '#FFFFFF',
  },
  senderName: {
    fontWeight: '600',
    marginBottom: 2,
  },
  senderRole: {
    fontSize: 12,
    color: '#6B7280',
  },
  ownText: {
    color: '#FFFFFF',
  },
  defaultText: {
    color: '#1F2937',
  },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
    textAlign: 'right',
  },
  ownTimestamp: {
    color: '#E0E7FF',
  },
  defaultTimestamp: {
    color: '#9CA3AF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginTop: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    paddingRight: 48,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    fontSize: 16,
  },
  sendButton: {
    position: 'absolute',
    right: 8,
    top: '50%',
    transform: [{ translateY: -20 }],
    backgroundColor: '#026338',
    borderRadius: 50,
    padding: 8,
  },
});
