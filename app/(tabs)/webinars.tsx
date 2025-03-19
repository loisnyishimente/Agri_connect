import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Linking, StyleSheet, Modal, Button } from 'react-native';

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
      id: '3',
      title: 'Pest Control Strategies',
      description: 'Best practices for pest control in organic farming.',
      category: 'Pest Control',
      date: '2025-03-15',
      time: '11:00 AM',
      link: 'https://zoom.us/def789',
    },
  ]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [newWebinar, setNewWebinar] = useState<Webinar>({
    id: '',
    title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    link: '',
  });

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

  const addWebinar = () => {
    if (newWebinar.title && newWebinar.description && newWebinar.category && newWebinar.date && newWebinar.time && newWebinar.link) {
      const newId = (webinars.length + 1).toString();
      const newWebinarData = { ...newWebinar, id: newId };
      setWebinars([...webinars, newWebinarData]);
      setModalVisible(false);
      setNewWebinar({
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        time: '',
        link: '',
      });
    } else {
      alert('Please fill in all fields.');
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


      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add Webinar</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Webinar</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Title"
              value={newWebinar.title}
              onChangeText={(text) => setNewWebinar({ ...newWebinar, title: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Description"
              value={newWebinar.description}
              onChangeText={(text) => setNewWebinar({ ...newWebinar, description: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Category"
              value={newWebinar.category}
              onChangeText={(text) => setNewWebinar({ ...newWebinar, category: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Date"
              value={newWebinar.date}
              onChangeText={(text) => setNewWebinar({ ...newWebinar, date: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Time"
              value={newWebinar.time}
              onChangeText={(text) => setNewWebinar({ ...newWebinar, time: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Link"
              value={newWebinar.link}
              onChangeText={(text) => setNewWebinar({ ...newWebinar, link: text })}
            />

            <View style={styles.modalButtons}>
              <Button color='red' title="Cancel" onPress={() => setModalVisible(false)} />
              <Button color='#026338' title="Add Webinar" onPress={addWebinar} />
            </View>
          </View>
        </View>
      </Modal>
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
    backgroundColor: '#026338',
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
    backgroundColor: '#026338',
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#026338',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default WebinarsScreen;
