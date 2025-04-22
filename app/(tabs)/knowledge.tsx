import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TextInput, StyleSheet,
  TouchableOpacity, ScrollView, Modal, Button, Linking
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';  // Import date picker

type KnowledgeArticle = {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  pdfLink: string;
};

const STORAGE_KEY = 'knowledge_articles';

const KnowledgeScreen = () => {
  const defaultArticles: KnowledgeArticle[] = [
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
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState<KnowledgeArticle[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newArticle, setNewArticle] = useState<KnowledgeArticle>({
    id: '',
    title: '',
    description: '',
    category: '',
    date: '',
    pdfLink: '',
  });
  
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const storedArticles = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedArticles) {
        setArticles(JSON.parse(storedArticles));
      } else {
        setArticles(defaultArticles);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultArticles));
      }
    } catch (error) {
      console.error('Failed to load articles', error);
    }
  };

  const saveArticles = async (updatedArticles: KnowledgeArticle[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedArticles));
    } catch (error) {
      console.error('Failed to save articles', error);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = articles.filter(article =>
        article.title.toLowerCase().includes(query.toLowerCase())
      );
      setArticles(filtered);
    } else {
      loadArticles();
    }
  };

  const handleAddArticle = () => {
    const newId = (articles.length + 1).toString();
    const updatedArticles = [...articles, { ...newArticle, id: newId }];
    setArticles(updatedArticles);
    saveArticles(updatedArticles);
    setModalVisible(false);
    setNewArticle({ id: '', title: '', description: '', category: '', date: '', pdfLink: '' });
  };

  const handleReadArticle = (pdfLink: string) => {
    Linking.openURL(pdfLink).catch((err) => console.error('Failed to open PDF link', err));
  };

  const handleDatePickerConfirm = (date: Date) => {
    setNewArticle({ ...newArticle, date: date.toISOString().split('T')[0] }); // Format the date as yyyy-mm-dd
    setDatePickerVisibility(false);
  };

  const renderArticleItem = ({ item }: { item: KnowledgeArticle }) => (
    <View style={styles.articleItem}>
      <Text style={styles.articleTitle}>{item.title}</Text>
      <Text style={styles.articleCategory}>Category: {item.category}</Text>
      <Text style={styles.articleDescription}>{item.description}</Text>
      <Text style={styles.articleDate}>Published on: {item.date}</Text>
      <Text style={styles.readArticleLink} onPress={() => handleReadArticle(item.pdfLink)}>
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

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Article</Text>
            {['title', 'description', 'category', 'pdfLink'].map((field) => (
              <TextInput
                key={field}
                style={styles.input}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={newArticle[field as keyof KnowledgeArticle]}
                onChangeText={(text) =>
                  setNewArticle({ ...newArticle, [field]: text })
                }
              />
            ))}

            {/* Date Picker Button */}
            <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
            <TextInput
  style={[styles.input, { paddingRight: 170 }]}  // Adjust padding for visual consistency
  editable={false}
  placeholder="Select Date"
  value={newArticle.date}
/>

            </TouchableOpacity>
  {/* Date Picker */}
  <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDatePickerConfirm}
        onCancel={() => setDatePickerVisibility(false)}
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
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  searchInput: {
    height: 40, borderColor: '#ddd', borderWidth: 1, borderRadius: 8,
    paddingLeft: 10, marginBottom: 20,
  },
  categoryContainer: {
    flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20,
  },
  categoryButton: {
    padding: 10, backgroundColor: '#026338', borderRadius: 8,
  },
  categoryButtonText: { color: '#fff', fontSize: 14 },
  articleList: { marginBottom: 20 },
  articleItem: {
    backgroundColor: '#f9f9f9', padding: 15, marginBottom: 15, borderRadius: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 4, elevation: 3,
  },
  articleTitle: { fontSize: 18, fontWeight: 'bold' },
  articleCategory: { fontSize: 14, color: '#026338', marginTop: 5 },
  articleDescription: { fontSize: 14, color: '#555', marginTop: 5 },
  articleDate: { fontSize: 12, color: '#aaa', marginTop: 10 },
  readArticleLink: {
    marginTop: 10, color: '#1E90FF', fontSize: 14,
    textDecorationLine: 'underline',
  },
  addArticleButton: {
    padding: 15, backgroundColor: '#026338',
    borderRadius: 8, marginTop: 20, alignItems: 'center',
  },
  addArticleButtonText: { color: '#fff', fontSize: 16 },
  modalOverlay: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff', padding: 20, width: '80%',
    borderRadius: 10, alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },

    input: {
      height: 40, 
      width: '100%',  // This will make the input field take up the full width of the container
      maxWidth: 350,  // You can set a maximum width if you don't want it to stretch too wide
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 8,
      paddingLeft: 10,
      marginBottom: 10,
    },
  modalButtons: {
    flexDirection: 'row', justifyContent: 'space-around',
    width: '100%',
  },
});

export default KnowledgeScreen;
