import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Alert, StyleSheet, ActivityIndicator } from 'react-native';
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
      date: new Date().toISOString().split('T')[0],
    };

    setEntries([newDiaryEntry, ...entries]);
    setNewEntry('');
  };

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const getCurrentMonth = () => {
    const date = new Date();
    return date.toISOString().slice(0, 7); // YYYY-MM
  };

  const filterEntriesByDate = (type: string) => {
    if (type === 'daily') {
      const today = getTodayDate();
      return entries.filter(entry => entry.date === today);
    } else if (type === 'monthly') {
      const currentMonth = getCurrentMonth();
      return entries.filter(entry => entry.date.startsWith(currentMonth));
    }
    return entries;
  };

  const generateAndDownloadFile = async (type = 'all') => {
    setIsDownloading(true);

    const filteredEntries = filterEntriesByDate(type);
    const reportTitle =
      type === 'daily' ? 'Daily Report' :
      type === 'monthly' ? 'Monthly Report' :
      'Full Diary Report';

    const reportContent = `${reportTitle}\n\nTotal Entries: ${filteredEntries.length}\n\n` +
      filteredEntries.map((entry) =>
        `Title: ${entry.title}\nDate: ${entry.date}\nDescription: ${entry.description}\n\n`
      ).join('');

    const fileName =
      type === 'daily' ? 'DailyFarmDiaryReport.txt' :
      type === 'monthly' ? 'MonthlyFarmDiaryReport.txt' :
      'FarmDiaryReport.txt';

    const fileUri = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.writeAsStringAsync(fileUri, reportContent, { encoding: FileSystem.EncodingType.UTF8 });

      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (fileInfo.exists) {
        setIsDownloading(false);
        Alert.alert('Success', `${reportTitle} generated!`);
        await Sharing.shareAsync(fileUri);
      } else {
        setIsDownloading(false);
        Alert.alert('Error', 'Failed to save the file.');
      }
    } catch (error) {
      setIsDownloading(false);
      Alert.alert('Error', 'Failed to save the file.');
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

      <View style={{ gap: 10 }}>
        <TouchableOpacity style={styles.downloadButton} onPress={() => generateAndDownloadFile('daily')}>
          <Text style={styles.downloadButtonText}>Download Daily Report</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.downloadButton} onPress={() => generateAndDownloadFile('monthly')}>
          <Text style={styles.downloadButtonText}>Download Monthly Report</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.downloadButton} onPress={() => generateAndDownloadFile('all')}>
          <Text style={styles.downloadButtonText}>Download Full Report</Text>
        </TouchableOpacity>
      </View>

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
  entryItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  entryTitle: { fontSize: 18, fontWeight: 'bold' },
  entryDate: { fontSize: 14, color: '#555', marginTop: 5 },
  entryDescription: { fontSize: 14, color: '#444', marginTop: 10 },
  downloadButton: { backgroundColor: '#007BFF', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  downloadButtonText: { color: '#fff', fontSize: 16 },
  loadingIndicator: { marginTop: 20 },
});

export default MyDiaryScreen;
