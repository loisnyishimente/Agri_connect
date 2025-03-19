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
  const [newTitle, setNewTitle] = useState<string>(''); // New title for the discussion
  const [newContent, setNewContent] = useState<string>(''); // New content for the discussion
  const [fullName, setFullName] = useState<string>(''); // Store the full name of the user

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = await AsyncStorage.getItem('user'); // Fetch the entire user object from AsyncStorage
        if (user !== null) {
          const parsedUser = JSON.parse(user); // Assuming the user data is stored as a JSON string
          setFullName(parsedUser.fullName || 'Guest'); // Extract and set only the user's fullName (fallback to 'Guest')
        } else {
          setFullName('Guest'); // Fallback if no user is found
        }
      } catch (error) {
        console.error('Error fetching user name', error);
      }
    };

    fetchUserName();

    // Static sample data for discussions
    const sampleData: Discussion[] = [
      {
        id: '1',
        title: 'Sustainable Farming Practices',
        content: 'Discuss the best practices for sustainable farming and agriculture.',
        createdAt: '2025-03-15 10:00 AM',
        author: 'musimenta lois',
      },
      {
        id: '2',
        title: 'Latest Advances in Irrigation Systems',
        content: 'What are the newest technologies in irrigation systems for better crop yields?',
        createdAt: '2025-03-16 12:30 PM',
        author: 'Aline kalisa',
      },
    ];

    setDiscussions(sampleData); // Initial discussions
  }, []);

  const handleCreateDiscussion = async () => {
    if (newTitle.trim() && newContent.trim()) {
      const newPost: Discussion = {
        id: String(discussions.length + 1),
        title: newTitle,
        content: newContent,
        createdAt: new Date().toLocaleString(),
        author: fullName || 'Guest', // Use fullName as the author
      };
      const updatedDiscussions = [newPost, ...discussions]; // Add new post to the top of the list
      setDiscussions(updatedDiscussions);
      setNewTitle(''); // Reset the title input field
      setNewContent(''); // Reset the content input field

      // Save updated discussions to AsyncStorage
      try {
        await AsyncStorage.setItem('discussions', JSON.stringify(updatedDiscussions));
      } catch (error) {
        console.error('Error saving discussions', error);
      }
    } else {
      console.error('Title and content are required');
    }
  };

  const renderDiscussionItem = ({ item }: { item: Discussion }) => (
    <TouchableOpacity onPress={() => navigation.navigate('discussionChat', { discussionId: item.id })}>
      <View style={styles.discussionItem}>
        <Text style={styles.discussionTitle}>{item.title}</Text>
        <Text style={styles.discussionContent}>{item.content}</Text>
        <Text style={styles.createdAt}>{item.createdAt}</Text>
        <Text style={styles.author}>By: {item.author}</Text> {/* Display only the author's name */}
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
          placeholder="Discussion title"
          value={newTitle}
          onChangeText={setNewTitle}
        />
        <TextInput
          style={[styles.input, { height: 50 }]} // Adjust the height for the content input
          placeholder="Start a new discussion"
          value={newContent}
          onChangeText={setNewContent}
          multiline // Allows multiline text input for content
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
