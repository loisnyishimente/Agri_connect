import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, ScrollView, Modal, Button, Linking } from 'react-native';

import * as DocumentPicker from 'react-native-document-picker';
interface KnowledgeArticle {
  id: string;
  url: string | null | undefined;
  title: string;
  description: string;
  category: string;
  date: string;
}

const KnowledgeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState<KnowledgeArticle[]>([
    {
      id: '1',
      title: 'Best Practices for Soil Health',
      description: 'Learn the best practices to keep your soil healthy and productive.',
      category: 'Soil Health',
      date: '2025-03-01',
      url: 'https://example.com/soil-health',
    },
    {
      id: '2',
      title: 'Top Tips for Pest Control',
      description: 'Explore the most effective ways to manage pests in your crops.',
      category: 'Pest Control',
      date: '2025-03-05',
      url: 'https://example.com/pest-control',
    },
    {
      id: '3',
      title: 'Irrigation Techniques for Better Yields',
      description: 'Understand the irrigation systems that can improve crop yields.',
      category: 'Irrigation',
      date: '2025-02-20',
      url: 'https://example.com/irrigation-techniques',
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newArticle, setNewArticle] = useState<KnowledgeArticle>({
    id: '',
    title: '',
    description: '',
    category: '',
    date: '',
    url: null,
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
          url: 'https://example.com/soil-health',
        },
        {
          id: '3',
          title: 'Irrigation Techniques for Better Yields',
          description: 'Understand the irrigation systems that can improve crop yields.',
          category: 'Irrigation',
          date: '2025-02-20',
          url: 'https://example.com/irrigation-techniques',
        },
      ]);
    }
  };

  const handleAddArticle = () => {
    setArticles([
      ...articles,
      {
        ...newArticle,
        id: (articles.length + 1).toString(),
      },
    ]);
    setModalVisible(false);
    setNewArticle({
      id: '',
      title: '',
      description: '',
      category: '',
      date: '',
      url: null,
    });
  };

// Function to pick a document
const pickDocument = async () => {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf], // You can specify types if needed
    });

    // If there's at least one document picked, access its 'uri'
    if (res.length > 0) {
      const fileUri = res[0].uri;  // Access the first document's 'uri'
      console.log('Document URI:', fileUri);
      // Do something with the URI, like uploading or displaying it
    }
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.log('User canceled the picker');
    } else {
      console.error('Error picking document:', err);
    }
  }
};

  const renderArticleItem = ({ item }: { item: KnowledgeArticle }) => (
    <View style={styles.articleItem}>
      <Text style={styles.articleTitle}>{item.title}</Text>
      <Text style={styles.articleCategory}>Category: {item.category}</Text>
      <Text style={styles.articleDescription}>{item.description}</Text>
      <Text style={styles.articleDate}>Published on: {item.date}</Text>
      {item.url && (
        <TouchableOpacity onPress={() => Linking.openURL(item.url || '')}>
          <Text style={styles.articlePdf}>Read Article</Text>
        </TouchableOpacity>
      )}
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
            <TouchableOpacity style={styles.pdfButton} onPress={pickDocument}>
              <Text style={styles.pdfButtonText}>Pick PDF</Text>
            </TouchableOpacity>
            {newArticle.url && (
              <Text style={styles.pdfPicked}>PDF Selected: {newArticle.url}</Text>
            )}
            <View style={styles.modalButtons}>
              <Button color="red" title="Cancel" onPress={() => setModalVisible(false)} />
              <Button color="#026338" title="Add Article" onPress={handleAddArticle} />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  categoryButton: {
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#026338',
    borderRadius: 5,
  },
  categoryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  articleList: {
    marginBottom: 20,
  },
  articleItem: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  articleCategory: {
    fontStyle: 'italic',
    color: '#888',
  },
  articleDescription: {
    marginTop: 5,
  },
  articleDate: {
    marginTop: 5,
    fontSize: 12,
    color: '#888',
  },
  articlePdf: {
    marginTop: 5,
    fontSize: 12,
    color: '#026338',
  },
  addArticleButton: {
    backgroundColor: '#026338',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  addArticleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
    borderRadius: 10,
    width: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  pdfButton: {
    marginTop: 10,
    backgroundColor: 'gray',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  pdfButtonText: {
    color: '#fff',
  },
  pdfPicked: {
    marginTop: 10,
    color: '#026338',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default KnowledgeScreen;
