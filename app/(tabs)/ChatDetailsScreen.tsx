import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'them';
  status: 'sent' | 'delivered' | 'seen'; // Add message status
}

type RootStackParamList = {
  chatDetailScreen: { chatId: string; chatName: string };
};

type ChatDetailScreenRouteProp = RouteProp<RootStackParamList, 'chatDetailScreen'>;

const ChatDetailScreen: React.FC = () => {
  const route = useRoute<ChatDetailScreenRouteProp>();
  const navigation = useNavigation();
  const { chatName } = route.params;

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hey! How are you?', sender: 'them', status: 'sent' },
    { id: '2', text: 'I’m good, what about you?', sender: 'me', status: 'delivered' },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [typing, setTyping] = useState(false); // Typing indicator
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Scroll to the bottom when messages are updated
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim().length > 0) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now().toString(), text: newMessage, sender: 'me', status: 'sent' },
      ]);
      setNewMessage('');
      setTyping(false); // Reset typing indicator
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
      <Text style={styles.messageStatus}>
        {item.status === 'sent' ? 'Sent' : item.status === 'delivered' ? 'Delivered' : 'Seen'}
      </Text>
    </View>
  );

  const handleInputChange = (text: string) => {
    setNewMessage(text);
    if (!typing) {
      setTyping(true); // Show typing indicator
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.header}>{chatName}</Text>
      </View>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        style={styles.flatList}
      />
      {typing && (
        <View style={styles.typingIndicatorContainer}>
          <Text style={styles.typingIndicatorText}>Typing...</Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={handleInputChange}
          onFocus={() => setTyping(true)} // Start typing indicator when focused
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
    backgroundColor: '#026338',
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
    flex: 1,
  },
  messageBubble: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: '75%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#026338',
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#DDD',
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
  messageStatus: {
    fontSize: 10,
    color: '#888',
    marginTop: 5,
  },
  typingIndicatorContainer: {
    paddingLeft: 15,
    paddingBottom: 5,
  },
  typingIndicatorText: {
    fontStyle: 'italic',
    color: '#888',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#CCC',
    backgroundColor: '#FFF',
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
    backgroundColor: '#026338',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  flatList: {
    marginBottom: 10,
  },
});

export default ChatDetailScreen;
