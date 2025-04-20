import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Alert, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

const MyDiaryScreen = () => {
  const [entries, setEntries] = useState([
    { id: '1', title: 'Planted Tomatoes', description: 'Planted tomato seeds in the northern field.', date: '2025-03-18' },
    { id: '2', title: 'Watered Corn Field', description: 'Watered the corn field in the southern section.', date: '2025-03-19' },
    { id: '3', title: 'Harvested Carrots', description: 'Harvested carrots from the east field.', date: '2025-03-20' },
  ]);

  const [newEntry, setNewEntry] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportType, setReportType] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().substr(0, 7));
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [hasMediaPermission, setHasMediaPermission] = useState(false);

  const availableMonths = [...new Set(entries.map(entry => entry.date.substr(0, 7)))].sort().reverse();
  const availableDates = [...new Set(entries.map(entry => entry.date))].sort().reverse();

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasMediaPermission(status === 'granted');
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'This app needs access to your media library to save files.');
      }
    })();
  }, []);

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

  const filterEntriesByType = () => {
    switch (reportType) {
      case 'monthly':
        return entries.filter(entry => entry.date.startsWith(selectedMonth));
      case 'daily':
        return entries.filter(entry => entry.date === selectedDate);
      default:
        return entries;
    }
  };

  const getReportTitle = () => {
    switch (reportType) {
      case 'monthly':
        const [year, month] = selectedMonth.split('-');
        const monthName = new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', { month: 'long' });
        return `Farm Diary Report - ${monthName} ${year}`;
      case 'daily':
        const date = new Date(selectedDate);
        return `Farm Diary Report - ${date.toLocaleDateString('default', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`;
      default:
        return 'Farm Diary Report - All Entries';
    }
  };

  const saveToDevice = async (fileUri: string, fileName: string) => {
    try {
      if (!hasMediaPermission) {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Cannot save file without permission.');
          return false;
        }
      }
  
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync('FarmDiary', asset, false);
  
      Alert.alert('Success', 'Report saved to your device in the FarmDiary album.');
      return true;
    } catch (error) {
      console.error('Error saving to device:', error);
      Alert.alert('Error', 'Failed to save file to your device.');
      return false;
    }
  };
  
  const generateAndDownloadFile = async () => {
    setIsDownloading(true);
    setReportModalVisible(false);
  
    try {
      const filteredEntries = filterEntriesByType();
      const reportTitle = getReportTitle();
  
      const reportContent = `${reportTitle}\n\nTotal Entries: ${filteredEntries.length}\n\n` +
        filteredEntries.map((entry) => `Title: ${entry.title}\nDate: ${entry.date}\nDescription: ${entry.description}\n\n`).join('');
  
      let fileName = 'FarmDiaryReport';
      if (reportType === 'monthly') fileName += `_${selectedMonth}`;
      else if (reportType === 'daily') fileName += `_${selectedDate}`;
  
      const fileUri = `${FileSystem.documentDirectory}${fileName}.txt`;
  
      // Write the file content to the document directory
      await FileSystem.writeAsStringAsync(fileUri, reportContent, { encoding: FileSystem.EncodingType.UTF8 });
  
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (!fileInfo.exists) throw new Error('File creation failed');
  
      const canShare = await Sharing.isAvailableAsync();
      if (canShare) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'text/plain',
          dialogTitle: `Save ${reportTitle}`,
          UTI: 'public.plain-text'
        });
      } else {
        await saveToDevice(fileUri, fileName);
      }
    } catch (error) {
      console.error('File generation error:', error);
      Alert.alert('Error', 'Failed to generate or save the report.');
    } 
  };
  

  const ReportTypeModal = () => (
    <Modal animationType="slide" transparent={true} visible={reportModalVisible} onRequestClose={() => setReportModalVisible(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Report Type</Text>

          {['all', 'monthly', 'daily'].map(type => (
            <TouchableOpacity
              key={type}
              style={[styles.reportTypeButton, reportType === type && styles.selectedReportType]}
              onPress={() => setReportType(type)}
            >
              <Text style={styles.reportTypeText}>{type === 'all' ? 'All Entries' : `${type.charAt(0).toUpperCase() + type.slice(1)} Report`}</Text>
            </TouchableOpacity>
          ))}

          {reportType === 'monthly' && (
            <FlatList
              data={availableMonths}
              horizontal
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                const [year, month] = item.split('-');
                const monthName = new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', { month: 'short' });
                return (
                  <TouchableOpacity
                    style={[styles.dateButton, selectedMonth === item && styles.selectedDateButton]}
                    onPress={() => setSelectedMonth(item)}
                  >
                    <Text>{`${monthName} ${year}`}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          )}

          {reportType === 'daily' && (
            <FlatList
              data={availableDates}
              horizontal
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                const date = new Date(item);
                return (
                  <TouchableOpacity
                    style={[styles.dateButton, selectedDate === item && styles.selectedDateButton]}
                    onPress={() => setSelectedDate(item)}
                  >
                    <Text>{date.toLocaleDateString('default', { month: 'short', day: 'numeric' })}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          )}

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setReportModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.downloadButton} onPress={generateAndDownloadFile}>
              <Text style={styles.downloadButtonText}>Download</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

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

      <TouchableOpacity style={styles.downloadReportButton} onPress={() => setReportModalVisible(true)}>
        <Text style={styles.downloadReportText}>Generate Report</Text>
      </TouchableOpacity>

      {isDownloading && <ActivityIndicator size="large" color="green" style={{ marginVertical: 10 }} />}

      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.entryCard}>
            <Text style={styles.entryTitle}>{item.title}</Text>
            <Text style={styles.entryDate}>{item.date}</Text>
            <Text style={styles.entryDescription}>{item.description}</Text>
          </View>
        )}
      />

      {ReportTypeModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f0f0' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  inputField: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 10, backgroundColor: '#fff' },
  addButton: { backgroundColor: '#28a745', padding: 10, borderRadius: 8, alignItems: 'center' },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  downloadReportButton: { marginTop: 10, backgroundColor: '#007bff', padding: 10, borderRadius: 8, alignItems: 'center' },
  downloadReportText: { color: '#fff', fontWeight: 'bold' },
  entryCard: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginTop: 10 },
  entryTitle: { fontSize: 16, fontWeight: 'bold' },
  entryDate: { fontSize: 12, color: 'gray' },
  entryDescription: { marginTop: 5 },
  modalOverlay: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { margin: 20, backgroundColor: '#fff', padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  reportTypeButton: { padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginVertical: 5 },
  selectedReportType: { backgroundColor: '#cdeffd' },
  reportTypeText: { textAlign: 'center' },
  dateButton: { padding: 10, margin: 5, backgroundColor: '#eee', borderRadius: 5 },
  selectedDateButton: { backgroundColor: '#a4e2ff' },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  cancelButton: { backgroundColor: '#ccc', padding: 10, borderRadius: 8 },
  cancelButtonText: { fontWeight: 'bold' },
  downloadButton: { backgroundColor: '#28a745', padding: 10, borderRadius: 8 },
  downloadButtonText: { color: '#fff', fontWeight: 'bold' },
});

export default MyDiaryScreen;
