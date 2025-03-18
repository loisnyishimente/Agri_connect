import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadMessages: number;
  avatar: string;
}

type RootStackParamList = {
  ChatDetailScreen: { chatId: string; chatName: string };
};

const ChatScreen: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      name: "Farmer John",
      lastMessage: "Crop prices are rising 📈",
      timestamp: "10:30 AM",
      unreadMessages: 2,
      avatar: "https://via.placeholder.com/50",
    },
    {
      id: "2",
      name: "AgroMarket",
      lastMessage: "New fertilizer available now!",
      timestamp: "Yesterday",
      unreadMessages: 0,
      avatar: "https://via.placeholder.com/50",
    },
    {
      id: "3",
      name: "Rwanda Agri-Coop",
      lastMessage: "Let's plan the next webinar 🌱",
      timestamp: "Monday",
      unreadMessages: 1,
      avatar: "https://via.placeholder.com/50",
    },
    {
      id: "4",
      name: "Pesticide Suppliers",
      lastMessage: "Your order has been shipped 🚜",
      timestamp: "Sunday",
      unreadMessages: 0,
      avatar: "https://via.placeholder.com/50",
    },
  ]);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleOpenChat = (chat: Chat) => {
    navigation.navigate('ChatDetailScreen', {
      chatId: chat.id,
      chatName: chat.name,
    });
    setChats((prevChats) =>
      prevChats.map((c) => (c.id === chat.id ? { ...c, unreadMessages: 0 } : c))
    );
  };
  
  const renderChatItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity style={styles.chatItem} onPress={() => handleOpenChat(item)}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatInfo}>
        <View>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.lastMessage}>{item.lastMessage}</Text>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
          {item.unreadMessages > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unreadMessages}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}> Chats</Text>
        <Ionicons name="chatbubble-ellipses-outline" size={24} color="white" />
      </View>
      <FlatList data={chats} keyExtractor={(item) => item.id} renderItem={renderChatItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#2E7D32",
  },
  headerTitle: {
    fontSize: 20,
    color: "#FFF",
    fontWeight: "bold",
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#DDD",
    backgroundColor: "#FFF",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  chatInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center",
  },
  chatName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  lastMessage: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  rightSection: {
    alignItems: "flex-end",
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
  },
  unreadBadge: {
    backgroundColor: "#2E7D32",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 5,
  },
  unreadText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default ChatScreen;
