import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Discussion = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: string;
};

const DiscussionScreen = ({ navigation }: any) => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [newDiscussion, setNewDiscussion] = useState<string>('');
  const [fullName, setFullName] = useState<string>(''); 

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = await AsyncStorage.getItem('user'); 
        if (user !== null) {
          const parsedUser = JSON.parse(user); 
          setFullName(parsedUser.fullName || 'Guest'); 
        } else {
          setFullName('Guest'); 
        }

       
        fetchDiscussions();
      } catch (error) {
        console.error('Error fetching user name', error);
      }
    };

    fetchUserName();
  }, []);

  const fetchDiscussions = async () => {
    try {
      const storedDiscussions = await AsyncStorage.getItem('discussions');
      const parsedDiscussions: Discussion[] = storedDiscussions ? JSON.parse(storedDiscussions) : [];

     
      const sampleDiscussion: Discussion = {
        id: '1',
        title: 'Sample Discussion',
        content: 'This is a sample discussion available for all users.',
        createdAt: '2023-12-25 12:00 PM',
        author: 'Admin',
      };

  
      if (!parsedDiscussions.some((discussion) => discussion.id === sampleDiscussion.id)) {
        parsedDiscussions.unshift(sampleDiscussion);
      }

      setDiscussions(parsedDiscussions);
    } catch (error) {
      console.error('Error fetching discussions', error);
    }
  };

  const handleCreateDiscussion = async () => {
    if (newDiscussion.trim()) {
      const newPost: Discussion = {
        id: String(discussions.length + 1),
        title: newDiscussion,
        content: 'This is a new discussion.',
        createdAt: new Date().toLocaleString(),
        author: fullName || 'Guest', 
      };
      const updatedDiscussions = [newPost, ...discussions]; 
      setDiscussions(updatedDiscussions);
      setNewDiscussion(''); 

      
      try {
        await AsyncStorage.setItem('discussions', JSON.stringify(updatedDiscussions));
      } catch (error) {
        console.error('Error saving discussions', error);
      }
    }
  };

  const renderDiscussionItem = ({ item }: { item: Discussion }) => (
    <TouchableOpacity onPress={() => navigation.navigate('discussionChat', { discussionId: item.id })}>
      <View style={styles.discussionItem}>
        <Text style={styles.discussionTitle}>{item.title}</Text>
        <Text style={styles.discussionContent}>{item.content}</Text>
        <Text style={styles.createdAt}>{item.createdAt}</Text>
        <Text style={styles.author}>By: {item.author}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
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
        <Button title="Post" onPress={handleCreateDiscussion} color="#026338" />
      </View>
    </KeyboardAvoidingView>
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
    color: '#026338',
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
    borderLeftColor: '#026338',
  },
  discussionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#026338',
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
  author: {
    fontSize: 12,
    color: '#555',
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
