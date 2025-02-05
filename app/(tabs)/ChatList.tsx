import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

interface Chat {
  id: string;
  name: string;
  unreadMessages: number;
}


type RootStackParamList = {
  ChatScreen: { chatId: string; chatName: string; };
};

const ChatListScreen: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([
    { id: '1', name: 'John', unreadMessages: 2 },
    { id: '2', name: 'Jane', unreadMessages: 0 },
    { id: '3', name: 'Mike', unreadMessages: 5 },
  ]);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleOpenChat = (chat: Chat) => {
    navigation.navigate('ChatScreen', { chatId: chat.id, chatName: chat.name });
    setChats((prevChats) =>
      prevChats.map((c) =>
        c.id === chat.id ? { ...c, unreadMessages: 0 } : c
      )
    );
  };

  const renderChatItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => handleOpenChat(item)}
    >
      <Text style={styles.chatName}>{item.name}</Text>
      {item.unreadMessages > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{item.unreadMessages}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  chatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#EEE',
  },
  chatName: {
    fontSize: 16,
  },
  unreadBadge: {
    backgroundColor: '#FF5252',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  unreadText: {
    color: '#FFF',
    fontSize: 12,
  },
});

export default ChatListScreen;