import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, Modal, TextInput, Button } from 'react-native';

type WeatherAlert = {
  id: string;
  title: string;
  description: string;
  severity: string;
  date: string;
  location: string;
  category: string; // e.g., 'Storm', 'Heatwave', 'Rain'
};

const WeatherAlertsScreen = () => {
  const [alerts, setAlerts] = useState<WeatherAlert[]>([
    {
      id: '1',
      title: 'Storm Warning - Tropical Storm',
      description: 'A tropical storm is approaching, with heavy rains and winds expected.',
      severity: 'High',
      date: '2025-03-18',
      location: 'Northern Region',
      category: 'Storm',
    },
   
    {
      id: '3',
      title: 'Heavy Rainfall Warning',
      description: 'Heavy rainfall expected in the Eastern Region. Farmers are advised to secure crops.',
      severity: 'Moderate',
      date: '2025-03-22',
      location: 'Eastern Region',
      category: 'Rain',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newAlert, setNewAlert] = useState<WeatherAlert>({
    id: '',
    title: '',
    description: '',
    severity: '',
    date: '',
    location: '',
    category: '',
  });

  const handleAddAlert = () => {
    const newId = (alerts.length + 1).toString();
    setAlerts([...alerts, { ...newAlert, id: newId }]);
    setShowModal(false);
    setNewAlert({
      id: '',
      title: '',
      description: '',
      severity: '',
      date: '',
      location: '',
      category: '',
    });
  };

  const renderAlertItem = ({ item }: { item: WeatherAlert }) => (
    <View style={styles.alertItem}>
      <Text style={styles.alertTitle}>{item.title}</Text>
      <Text style={styles.alertLocation}>Location: {item.location}</Text>
      <Text style={styles.alertDate}>Date: {item.date}</Text>
      <Text style={styles.alertSeverity}>Severity: {item.severity}</Text>
      <Text style={styles.alertDescription}>{item.description}</Text>

      <TouchableOpacity
        style={styles.viewDetailsButton}
        onPress={() => {
          alert(`Viewing details of the alert: ${item.title}`);
        }}
      >
        <Text style={styles.viewDetailsButtonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Weather Alerts</Text>

      {/* Add Weather Alert Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowModal(true)}
      >
        <Text style={styles.addButtonText}>Add Weather Alert</Text>
      </TouchableOpacity>

      {/* Category filter could be added here */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Storm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Rain</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Heatwave</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={alerts}
        renderItem={renderAlertItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.alertList}
      />

      {/* Modal to Add New Weather Alert */}
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Weather Alert</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={newAlert.title}
              onChangeText={(text) => setNewAlert({ ...newAlert, title: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={newAlert.description}
              onChangeText={(text) => setNewAlert({ ...newAlert, description: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Severity"
              value={newAlert.severity}
              onChangeText={(text) => setNewAlert({ ...newAlert, severity: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Date"
              value={newAlert.date}
              onChangeText={(text) => setNewAlert({ ...newAlert, date: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={newAlert.location}
              onChangeText={(text) => setNewAlert({ ...newAlert, location: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Category (e.g., Storm, Heatwave, Rain)"
              value={newAlert.category}
              onChangeText={(text) => setNewAlert({ ...newAlert, category: text })}
            />

            <Button color="#026338" title="Add Alert" onPress={handleAddAlert} />
       
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
  addButton: {
    backgroundColor: '#026338',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#026338',
    borderRadius: 8,
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  alertList: {
    marginBottom: 20,
  },
  alertItem: {
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
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  alertLocation: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  alertDate: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  alertSeverity: {
    fontSize: 14,
    color: '#ff5722', // Red color for high severity
    marginTop: 5,
  },
  alertDescription: {
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 4,
  },
});

export default WeatherAlertsScreen;
