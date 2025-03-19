import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';

type DairyEntry = {
  id: string;
  title: string;
  description: string;
  date: string;
};

const MyDiaryScreen = () => {
  const [entries, setEntries] = useState<DairyEntry[]>([
    {
      id: '1',
      title: 'Planted Tomatoes',
      description: 'Planted tomato seeds in the northern field. Expecting good harvest.',
      date: '2025-03-18',
    },
  
  
  ]);

  const [newEntry, setNewEntry] = useState<string>('');

  const addNewEntry = () => {
    if (newEntry.trim() === '') {
      Alert.alert('Error', 'Please enter a title for the diary entry.');
      return;
    }

    const newDiaryEntry = {
      id: (entries.length + 1).toString(),
      title: newEntry,
      description: 'No description provided.',
      date: new Date().toLocaleDateString(),
    };

    setEntries([newDiaryEntry, ...entries]);
    setNewEntry('');
  };

  const renderEntryItem = ({ item }: { item: DairyEntry }) => (
    <View style={styles.entryItem}>
      <Text style={styles.entryTitle}>{item.title}</Text>
      <Text style={styles.entryDate}>{item.date}</Text>
      <Text style={styles.entryDescription}>{item.description}</Text>

      <TouchableOpacity
        style={styles.viewDetailsButton}
        onPress={() => {
         
          alert(`Viewing details of entry: ${item.title}`);
        }}
      >
        <Text style={styles.viewDetailsButtonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Dairy</Text>

  
      <TextInput
        value={newEntry}
        onChangeText={setNewEntry}
        placeholder="Add a new diary entry..."
        style={styles.inputField}
      />

      <TouchableOpacity style={styles.addButton} onPress={addNewEntry}>
        <Text style={styles.addButtonText}>Add Entry</Text>
      </TouchableOpacity>

      
      <FlatList
        data={entries}
        renderItem={renderEntryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.entriesList}
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
  entriesList: {
    marginBottom: 20,
  },
  entryItem: {
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
  entryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  entryDate: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  entryDescription: {
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

export default MyDiaryScreen;
