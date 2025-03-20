import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, ScrollView, Modal, Button, Linking } from 'react-native';

type KnowledgeArticle = {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  pdfLink: string; // New field for the PDF link
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
      pdfLink: 'https://www.manage.gov.in/publications/farmerbook.pdf',
    },
    {
      id: '2',
      title: 'Top Tips for Pest Control',
      description: 'Explore the most effective ways to manage pests in your crops.',
      category: 'Pest Control',
      date: '2025-03-05',
      pdfLink: 'https://www.manage.gov.in/publications/farmerbook.pdf', 
    },
    {
      id: '3',
      title: 'Irrigation Techniques for Better Yields',
      description: 'Understand the irrigation systems that can improve crop yields.',
      category: 'Irrigation',
      date: '2025-02-20',
      pdfLink: 'https://www.manage.gov.in/publications/farmerbook.pdf', // Example link
    },
  ]);
  

  const [modalVisible, setModalVisible] = useState(false);
  const [newArticle, setNewArticle] = useState<KnowledgeArticle>({
    id: '',
    title: '',
    description: '',
    category: '',
    date: '',
    pdfLink: '', // New field for PDF link
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filteredArticles = articles.filter((article) =>
        article.title.toLowerCase().includes(query.toLowerCase())
      );
      setArticles(filteredArticles);
    } else {
      setArticles([
        {
          id: '1',
          title: 'Best Practices for Soil Health',
          description: 'Learn the best practices to keep your soil healthy and productive.',
          category: 'Soil Health',
          date: '2025-03-01',
          pdfLink: 'https://www.manage.gov.in/publications/farmerbook.pdf',
        },
        {
          id: '2',
          title: 'Top Tips for Pest Control',
          description: 'Explore the most effective ways to manage pests in your crops.',
          category: 'Pest Control',
          date: '2025-03-05',
          pdfLink: 'https://www.manage.gov.in/publications/farmerbook.pdf',
        },
        {
          id: '3',
          title: 'Irrigation Techniques for Better Yields',
          description: 'Understand the irrigation systems that can improve crop yields.',
          category: 'Irrigation',
          date: '2025-02-20',
          pdfLink: 'https://www.manage.gov.in/publications/farmerbook.pdf',
        },
      ]);
    }
  };

  const handleAddArticle = () => {
    setArticles([
      ...articles,
      {
        ...newArticle,
        id: (articles.length + 1).toString(), // Generate a new ID
      },
    ]);
    setModalVisible(false);
    setNewArticle({
      id: '',
      title: '',
      description: '',
      category: '',
      date: '',
      pdfLink: '', // Reset PDF link
    });
  };

  const handleReadArticle = (pdfLink: string) => {
    Linking.openURL(pdfLink).catch((err) => console.error('Failed to open PDF link', err));
  };

  const renderArticleItem = ({ item }: { item: KnowledgeArticle }) => (
    <View style={styles.articleItem}>
      <Text style={styles.articleTitle}>{item.title}</Text>
      <Text style={styles.articleCategory}>Category: {item.category}</Text>
      <Text style={styles.articleDescription}>{item.description}</Text>
      <Text style={styles.articleDate}>Published on: {item.date}</Text>

      {/* Read Article Link */}
      <Text
        style={styles.readArticleLink}
        onPress={() => handleReadArticle(item.pdfLink)}
      >
        Read Article
      </Text>
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

      <TouchableOpacity style={styles.addArticleButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addArticleButtonText}>Add New Article</Text>
      </TouchableOpacity>

      {/* Modal to add a new article */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Article</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={newArticle.title}
              onChangeText={(text) => setNewArticle({ ...newArticle, title: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={newArticle.description}
              onChangeText={(text) => setNewArticle({ ...newArticle, description: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Category"
              value={newArticle.category}
              onChangeText={(text) => setNewArticle({ ...newArticle, category: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Date (YYYY-MM-DD)"
              value={newArticle.date}
              onChangeText={(text) => setNewArticle({ ...newArticle, date: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="PDF Link"
              value={newArticle.pdfLink}
              onChangeText={(text) => setNewArticle({ ...newArticle, pdfLink: text })}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Add Article" onPress={handleAddArticle} />
            </View>
          </View>
        </View>
      </Modal>
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
    backgroundColor: '#026338',
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
    color: '#026338',
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
  readArticleLink: {
    marginTop: 10,
    color: '#1E90FF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  addArticleButton: {
    padding: 15,
    backgroundColor: '#026338',
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  addArticleButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    width: '80%',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default KnowledgeScreen;
