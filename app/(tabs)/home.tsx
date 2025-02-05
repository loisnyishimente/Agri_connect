import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput } from 'react-native';


const weatherAlerts = [
  {
    id: '1',
    title: 'Rain Alert',
    description: 'Heavy rain expected tomorrow.',
    image: require('../../Images/rains_alert.png'), 
  },
  {
    id: '2',
    title: 'Heatwave Warning',
    description: 'High temperatures expected this week.',
    image: require('../../Images/temp_alert.png'), 
  },
];

const successStories = [
  {
    id: '1',
    title: 'Organic Farming Success',
    author: 'John Doe',
    story: 'Achieved 50% higher yield with organic methods.',
    image: require('../../Images/rain_alert.jpg'), 
  },
];

const trendingTopics = [
  {
    id: '1',
    topic: 'Pest Control Methods',
    image: require('../../Images/rain_alert.jpg'), 
  },
  {
    id: '2',
    topic: 'Sustainable Farming Practices',
    image: require('../../Images/rain_alert.jpg'),
  },
];

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const renderWeatherAlert = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
    </View>
  );

  const renderSuccessStory = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>By {item.author}</Text>
      <Text style={styles.cardDescription}>{item.story}</Text>
    </View>
  );

  const renderTrendingTopic = ({ item }: { item: any }) => (
    <View style={styles.listItem}>
      <Image source={item.image} style={styles.listImage} />
      <Text style={styles.listText}>#{item.topic}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>Welcome to AgriConnect!</Text>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../Images/profile.jpg')} 
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>John Doe</Text>
        </View>
      </View>

     
      <TextInput
        style={styles.searchInput}
        placeholder="Search for posts..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      <Text style={styles.sectionHeader}>Weather Alerts</Text>
      <FlatList
        data={weatherAlerts}
        renderItem={renderWeatherAlert}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <Text style={styles.sectionHeader}>Success Stories</Text>
      <FlatList
        data={successStories}
        renderItem={renderSuccessStory}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.sectionMargin} 
      />

      <Text style={styles.sectionHeader}>Trending Topics</Text>
      <FlatList
        data={trendingTopics}
        renderItem={renderTrendingTopic}
        keyExtractor={(item) => item.id}
        style={styles.sectionMargin} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 25,
    marginRight: 10,
  },
  profileName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f6e2c',
  
    
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#01380a',
    marginBottom: 5,

  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginRight: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
    height:'200%',
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',

  },
  cardDescription: {
  
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#E8F5E9',
    borderRadius: 5,
    marginVertical: 5,
  },
  listImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  listText: {
    color: '#388E3C',
    fontWeight: '600',
  },
  sectionMargin: {

  },
});

export default HomeScreen;
