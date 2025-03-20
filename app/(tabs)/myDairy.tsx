import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Alert, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const MyDiaryScreen = () => {
  const [entries, setEntries] = useState([
    { id: '1', title: 'Planted Tomatoes', description: 'Planted tomato seeds in the northern field.', date: '2025-03-18' },
    { id: '2', title: 'Watered Corn Field', description: 'Watered the corn field in the southern section.', date: '2025-03-19' },
    { id: '3', title: 'Harvested Carrots', description: 'Harvested carrots from the east field.', date: '2025-03-20' },
  ]);

  const [newEntry, setNewEntry] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const addNewEntry = () => {
    if (newEntry.trim() === '') {
      Alert.alert('Error', 'Please enter a title for the diary entry.');
      return;
    }

    const newDiaryEntry = {
      id: (entries.length + 1).toString(),
      title: newEntry,
      description: 'No description provided.',
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    };

    setEntries([newDiaryEntry, ...entries]);
    setNewEntry('');
  };

  const generateAndDownloadFile = async () => {
    setIsDownloading(true);

    const reportContent = `Farm Diary Report\n\nTotal Entries: ${entries.length}\n\n` +
      entries.map((entry) => `Title: ${entry.title}\nDate: ${entry.date}\nDescription: ${entry.description}\n\n`).join('');

    const fileUri = FileSystem.documentDirectory + 'FarmDiaryReport.txt';
    try {
      await FileSystem.writeAsStringAsync(fileUri, reportContent, { encoding: FileSystem.EncodingType.UTF8 });
    
      // Check if the file exists
      const fileContent = await FileSystem.readAsStringAsync(fileUri);
      if (fileContent) {
        setIsDownloading(false);
        Alert.alert('Success', `Diary report saved to: ${fileUri}`);
      } else {
        setIsDownloading(false);
        Alert.alert('Error', 'Failed to save the file.');
      }
    } catch (error) {
      setIsDownloading(false);
      const errMsg = error instanceof Error ? error.message : 'Failed to save the file.';
      Alert.alert('Error', errMsg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Diary</Text>

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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.entryItem}>
            <Text style={styles.entryTitle}>{item.title}</Text>
            <Text style={styles.entryDate}>{item.date}</Text>
            <Text style={styles.entryDescription}>{item.description}</Text>
          </View>
        )}
        contentContainerStyle={styles.entriesList}
      />

      <TouchableOpacity style={styles.downloadButton} onPress={generateAndDownloadFile}>
        <Text style={styles.downloadButtonText}>Download Report</Text>
      </TouchableOpacity>

      {isDownloading && <ActivityIndicator size="large" color="#007BFF" style={styles.loadingIndicator} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  inputField: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingLeft: 10, marginBottom: 15 },
  addButton: { backgroundColor: '#026338', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  addButtonText: { color: '#fff', fontSize: 16 },
  entriesList: { marginBottom: 20 },
  entryItem: { backgroundColor: '#f9f9f9', padding: 15, marginBottom: 15, borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  entryTitle: { fontSize: 18, fontWeight: 'bold' },
  entryDate: { fontSize: 14, color: '#555', marginTop: 5 },
  entryDescription: { fontSize: 14, color: '#444', marginTop: 10 },
  downloadButton: { backgroundColor: '#007BFF', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  downloadButtonText: { color: '#fff', fontSize: 16 },
  loadingIndicator: { marginTop: 20 },
});

export default MyDiaryScreen;
