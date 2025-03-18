import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Linking, StyleSheet } from 'react-native';

interface Webinar {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  link: string;
}

const WebinarsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [webinars, setWebinars] = useState<Webinar[]>([
    {
      id: '1',
      title: 'Advancements in Irrigation Systems',
      description: 'Learn about the latest irrigation techniques to improve crop yield.',
      category: 'Irrigation',
      date: '2025-03-10',
      time: '10:00 AM',
      link: 'https://zoom.us/xyz123',
    },
    {
      id: '2',
      title: 'Soil Health for Better Crops',
      description: 'Understanding soil health and its role in sustainable agriculture.',
      category: 'Soil Health',
      date: '2025-03-12',
      time: '2:00 PM',
      link: 'https://zoom.us/abc456',
    },
    {
      id: '3',
      title: 'Pest Control Strategies',
      description: 'Best practices for pest control in organic farming.',
      category: 'Pest Control',
      date: '2025-03-15',
      time: '11:00 AM',
      link: 'https://zoom.us/def789',
    },
  ]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filteredWebinars = webinars.filter((webinar) =>
        webinar.title.toLowerCase().includes(query.toLowerCase())
      );
      setWebinars(filteredWebinars);
    } else {
      setWebinars([
        {
          id: '1',
          title: 'Advancements in Irrigation Systems',
          description: 'Learn about the latest irrigation techniques to improve crop yield.',
          category: 'Irrigation',
          date: '2025-03-10',
          time: '10:00 AM',
          link: 'https://zoom.us/xyz123',
        },
        {
          id: '2',
          title: 'Soil Health for Better Crops',
          description: 'Understanding soil health and its role in sustainable agriculture.',
          category: 'Soil Health',
          date: '2025-03-12',
          time: '2:00 PM',
          link: 'https://zoom.us/abc456',
        },
        {
          id: '3',
          title: 'Pest Control Strategies',
          description: 'Best practices for pest control in organic farming.',
          category: 'Pest Control',
          date: '2025-03-15',
          time: '11:00 AM',
          link: 'https://zoom.us/def789',
        },
      ]);
    }
  };

  const renderWebinarItem = ({ item }: { item: Webinar }) => (
    <View style={styles.webinarItem}>
      <Text style={styles.webinarTitle}>{item.title}</Text>
      <Text style={styles.webinarCategory}>Category: {item.category}</Text>
      <Text style={styles.webinarDescription}>{item.description}</Text>
      <Text style={styles.webinarDate}>Date: {item.date}</Text>
      <Text style={styles.webinarTime}>Time: {item.time}</Text>
      <TouchableOpacity
        style={styles.joinButton}
        onPress={() => {
          Linking.openURL(item.link);
        }}
      >
        <Text style={styles.joinButtonText}>Join Webinar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agriculture Webinars</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for webinars..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <View style={styles.categoryContainer}>
        <TouchableOpacity style={styles.categoryButton} onPress={() => handleSearch('Irrigation')}>
          <Text style={styles.categoryButtonText}>Irrigation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton} onPress={() => handleSearch('Soil Health')}>
          <Text style={styles.categoryButtonText}>Soil Health</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton} onPress={() => handleSearch('Pest Control')}>
          <Text style={styles.categoryButtonText}>Pest Control</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={webinars}
        renderItem={renderWebinarItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.webinarList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    marginBottom: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  categoryButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  categoryButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  webinarList: {
    paddingBottom: 16,
  },
  webinarItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  webinarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  webinarCategory: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
  },
  webinarDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  webinarDate: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  webinarTime: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  joinButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default WebinarsScreen;
