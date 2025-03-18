import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

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
      id: '2',
      title: 'Heatwave Alert',
      description: 'A heatwave is expected in the Southern Region, with temperatures reaching over 40°C.',
      severity: 'High',
      date: '2025-03-20',
      location: 'Southern Region',
      category: 'Heatwave',
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
    // More weather alerts can be added here...
  ]);

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
          // Handle the view details action, could navigate to a detailed alert screen
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
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
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewDetailsButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default WeatherAlertsScreen;
