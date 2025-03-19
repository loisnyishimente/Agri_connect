import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, FlatList, TouchableOpacity, 
  Image, Alert, TextInput, ImageSourcePropType 
} from 'react-native';

import Story1 from '../../Images/profile.png';
import Story2 from '../../Images/profile.png';
import Story3 from '../../Images/profile.png';
type SuccessStory = {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string | ImageSourcePropType; 
};

const SuccessStoriesScreen = () => {
  const [stories, setStories] = useState<SuccessStory[]>([
    {
      id: '1',
      title: 'Tomato Yield Boost',
      description: 'After learning about crop rotation techniques, John increased his tomato yield by 50%.',
      date: '2025-03-18',
      imageUrl: Story1, 
    },
    {
      id: '2',
      title: 'Effective Pest Control',
      description: 'Using integrated pest management strategies, Jane saved her crops from a major pest outbreak.',
      date: '2025-03-17',
      imageUrl: Story2,
    },
    {
      id: '3',
      title: 'Increased Wheat Production',
      description: 'With proper irrigation methods learned from the platform, Ahmed doubled his wheat production.',
      date: '2025-03-16',
      imageUrl: Story3,
    },
  ]);

  const [newStory, setNewStory] = useState<string>('');

  const addNewStory = () => {
    if (newStory.trim() === '') {
      Alert.alert('Error', 'Please enter a title for the success story.');
      return;
    }

    const newSuccessStory: SuccessStory = {
      id: (stories.length + 1).toString(),
      title: newStory,
      description: 'No description provided.',
      date: new Date().toLocaleDateString(),
      imageUrl: Story3,
    };

    setStories([newSuccessStory, ...stories]);
    setNewStory('');
  };

  const renderStoryItem = ({ item }: { item: SuccessStory }) => (
    <View style={styles.storyItem}>
      <Image
        source={typeof item.imageUrl === 'string' ? { uri: item.imageUrl } : item.imageUrl}
        style={styles.storyImage}
      />
      <View style={styles.storyDetails}>
        <Text style={styles.storyTitle}>{item.title}</Text>
        <Text style={styles.storyDate}>{item.date}</Text>
        <Text style={styles.storyDescription}>{item.description}</Text>

        <TouchableOpacity
          style={styles.viewDetailsButton}
          onPress={() => alert(`Viewing details of story: ${item.title}`)}
        >
          <Text style={styles.viewDetailsButtonText}>View Full Story</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Success Stories</Text>


      <TextInput
        value={newStory}
        onChangeText={setNewStory}
        placeholder="Add a new success story..."
        style={styles.inputField}
      />

      <TouchableOpacity style={styles.addButton} onPress={addNewStory}>
        <Text style={styles.addButtonText}>Add Story</Text>
      </TouchableOpacity>

  
      <FlatList
        data={stories}
        renderItem={renderStoryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.storiesList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputField: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: '#026338',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  storiesList: {
    marginBottom: 20,
  },
  storyItem: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  storyImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
  storyDetails: {
    flex: 1,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  storyDate: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  storyDescription: {
    fontSize: 14,
    color: '#444',
    marginTop: 10,
  },
  viewDetailsButton: {
    marginTop: 15,
    backgroundColor: '#026338',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewDetailsButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default SuccessStoriesScreen;
