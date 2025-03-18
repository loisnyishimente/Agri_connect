import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

type KnowledgeArticle = {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
};

const KnowledgeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState<KnowledgeArticle[]>([
    {
      id: '1',
      title: 'Best Practices for Soil Health',
      description: 'Learn the best practices to keep your soil healthy and productive.',
      category: 'Soil Health',
      date: '2025-03-01',
    },
    {
      id: '2',
      title: 'Top Tips for Pest Control',
      description: 'Explore the most effective ways to manage pests in your crops.',
      category: 'Pest Control',
      date: '2025-03-05',
    },
    {
      id: '3',
      title: 'Irrigation Techniques for Better Yields',
      description: 'Understand the irrigation systems that can improve crop yields.',
      category: 'Irrigation',
      date: '2025-02-20',
    },
    // Add more articles as necessary...
  ]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Filter articles based on search query
    if (query.trim()) {
      const filteredArticles = articles.filter((article) =>
        article.title.toLowerCase().includes(query.toLowerCase())
      );
      setArticles(filteredArticles);
    } else {
      setArticles([
        // Reset articles list if the search is cleared
        {
          id: '1',
          title: 'Best Practices for Soil Health',
          description: 'Learn the best practices to keep your soil healthy and productive.',
          category: 'Soil Health',
          date: '2025-03-01',
        },
        {
          id: '2',
          title: 'Top Tips for Pest Control',
          description: 'Explore the most effective ways to manage pests in your crops.',
          category: 'Pest Control',
          date: '2025-03-05',
        },
        {
          id: '3',
          title: 'Irrigation Techniques for Better Yields',
          description: 'Understand the irrigation systems that can improve crop yields.',
          category: 'Irrigation',
          date: '2025-02-20',
        },
        // Add more articles...
      ]);
    }
  };

  const renderArticleItem = ({ item }: { item: KnowledgeArticle }) => (
    <View style={styles.articleItem}>
      <Text style={styles.articleTitle}>{item.title}</Text>
      <Text style={styles.articleCategory}>Category: {item.category}</Text>
      <Text style={styles.articleDescription}>{item.description}</Text>
      <Text style={styles.articleDate}>Published on: {item.date}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Agriculture Knowledge Hub</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for articles..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      
      <View style={styles.categoryContainer}>
        <TouchableOpacity style={styles.categoryButton} onPress={() => handleSearch('Soil Health')}>
          <Text style={styles.categoryButtonText}>Soil Health</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton} onPress={() => handleSearch('Pest Control')}>
          <Text style={styles.categoryButtonText}>Pest Control</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton} onPress={() => handleSearch('Irrigation')}>
          <Text style={styles.categoryButtonText}>Irrigation</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={articles}
        renderItem={renderArticleItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.articleList}
      />
    </ScrollView>
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
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  categoryButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  categoryButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  articleList: {
    marginBottom: 20,
  },
  articleItem: {
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
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  articleCategory: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 5,
  },
  articleDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  articleDate: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 10,
  },
});

export default KnowledgeScreen;
