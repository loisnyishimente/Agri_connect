import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'them';
}

type RootStackParamList = {
  chatDetailScreen: { chatId: string; chatName: string };
};

type ChatDetailScreenRouteProp = RouteProp<RootStackParamList, 'chatDetailScreen'>;

const ChatDetailScreen: React.FC = () => {
  const route = useRoute<ChatDetailScreenRouteProp>();
  const navigation = useNavigation(); // For navigation
  const { chatName } = route.params;

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hey! How are you?', sender: 'them' },
    { id: '2', text: 'I’m good, what about you?', sender: 'me' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const flatListRef = useRef<FlatList>(null); // Reference to FlatList for scrolling

  useEffect(() => {
    // Scroll to the bottom when messages are updated
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim().length > 0) {
      setMessages([
        ...messages,
        { id: Date.now().toString(), text: newMessage, sender: 'me' },
      ]);
      setNewMessage('');
      
      // Scroll up a small distance after a message is sent
      setTimeout(() => {
        if (flatListRef.current) {
          flatListRef.current.scrollToOffset({ offset: 50, animated: true }); // Scroll up by 50px
        }
      }, 100); // Delay to make sure the list has updated first
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === 'me' ? styles.myMessage : styles.theirMessage,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          item.sender === 'me' ? styles.myMessageText : styles.theirMessageText,
        ]}
      >
        {item.text}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.header}>{chatName}</Text>
      </View>
      <FlatList
        ref={flatListRef} // Set the FlatList reference
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        inverted={false} // Ensure the messages are ordered from top to bottom
        style={styles.flatList} // Apply custom style to FlatList
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#026338', // Green header
    padding: 15,
  },
  backButton: {
    marginRight: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    flex: 1, // Centers the header text
  },
  messageBubble: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: '75%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#026338', // Green for sent messages
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#DDD', // Grey for received messages
  },
  messageText: {
    color: 'white',
  },
  myMessageText: {
    color: 'white',
  },
  theirMessageText: {
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#CCC',
    backgroundColor: '#FFF',
    marginTop: 0, // Remove margin at the top to reduce space between input and messages
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 25,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#026338', // Green button for sending messages
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  flatList: {
    marginBottom: 10, // Reduce the bottom margin between the messages and the input
  },
});

export default ChatDetailScreen;
