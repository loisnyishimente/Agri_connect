import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Discussion = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

const DiscussionScreen = ({ navigation }: any) => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [newDiscussion, setNewDiscussion] = useState<string>('');

  useEffect(() => {
    const sampleData: Discussion[] = [
      {
        id: '1',
        title: 'Sustainable Farming Practices',
        content: 'Discuss the best practices for sustainable farming and agriculture.',
        createdAt: '2025-03-15 10:00 AM',
      },
      {
        id: '2',
        title: 'Latest Advances in Irrigation Systems',
        content: 'What are the newest technologies in irrigation systems for better crop yields?',
        createdAt: '2025-03-16 12:30 PM',
      },
      {
        id: '3',
        title: 'Organic Farming Challenges',
        content: 'Challenges faced in organic farming and how to overcome them.',
        createdAt: '2025-03-17 03:45 PM',
      },
    ];
    setDiscussions(sampleData);
  }, []);

  const handleCreateDiscussion = () => {
    if (newDiscussion.trim()) {
      const newPost: Discussion = {
        id: String(discussions.length + 1), 
        title: newDiscussion,
        content: 'This is a new discussion.',
        createdAt: new Date().toLocaleString(),
      };
      setDiscussions([newPost, ...discussions]);
      setNewDiscussion('');
    }
  };

  const renderDiscussionItem = ({ item }: { item: Discussion }) => (
    <TouchableOpacity onPress={() => navigation.navigate('discussionChat', { discussionId: item.id })}>
      <View style={styles.discussionItem}>
        <Text style={styles.discussionTitle}>{item.title}</Text>
        <Text style={styles.discussionContent}>{item.content}</Text>
        <Text style={styles.createdAt}>{item.createdAt}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agricultural Discussion Forum</Text>

      <FlatList
        data={discussions}
        renderItem={renderDiscussionItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Start a new discussion"
          value={newDiscussion}
          onChangeText={setNewDiscussion}
        />
        <Button title="Post" onPress={handleCreateDiscussion} color="#4CAF50" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
    textAlign: 'center',
  },
  list: {
    marginBottom: 20,
  },
  discussionItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#4CAF50',
  },
  discussionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3b5d2e',
    marginBottom: 5,
  },
  discussionContent: {
    fontSize: 14,
    color: '#555',
  },
  createdAt: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 5,
  },
  inputContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 10,
  },
});

export default DiscussionScreen;
