import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Result = () => {
  const navigation = useNavigation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setLoading(true); // Set loading state to true before fetching data
    axios.get('http://192.168.0.112:3000/hasil_audit')
      .then(response => {
        console.log('API response:', response.data); // Log the response data
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
      })
      .finally(() => {
        setLoading(false); // Set loading state to false after fetching data
      });
  };

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);

  useEffect(() => {
    console.log('Data state:', data); // Log the data state whenever it changes
  }, [data]);

  const formatDate = (datetime) => {
    const date = new Date(datetime);
    return date.toISOString().split('T')[0]; // Extract and return only the date part
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error loading data: {error.message}</Text>
        <Button title="Refresh" onPress={fetchData} style={styles.button} />
      </View>
    );
  }

  if (!Array.isArray(data)) {
    console.error('Data is not an array:', data);
    return (
      <View style={styles.centered}>
        <Text>Data format is incorrect: {JSON.stringify(data)}</Text>
        <Button title="Refresh" onPress={fetchData} style={styles.button} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Daftar audit</Text>
      {data.length === 0 ? (
        <Text>No data available</Text>
      ) : (
        <ScrollView vertical>
        <ScrollView horizontal>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeaderRow]}>
              <Text style={styles.tableHeader}>ID</Text>
              <Text style={styles.tableHeader}>User ID</Text>
              <Text style={styles.tableHeader}>Judul</Text>
              <Text style={styles.tableHeader}>Area</Text>
              <Text style={styles.tableHeader}>Tanggal Audit</Text>
              <Text style={styles.tableHeader}>Tanggal Close</Text>
            </View>
            {data.map(item => (
              <View key={item.id} style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.id}</Text>
                <Text style={styles.tableCell}>{item.user_id}</Text>
                <Text style={styles.tableCell}>{item.judul}</Text>
                <Text style={styles.tableCell}>{item.area}</Text>
                <Text style={styles.tableCell}>{formatDate(item.tanggal_audit)}</Text>
                <Text style={styles.tableCell}>{formatDate(item.tanggal_close)}</Text>
                <Button title="edit" color="green"/>
                <Button title="delete" color="red"/>
              </View>
            ))}
            
          </View>
        </ScrollView>
        </ScrollView>
      )}
      <Button title="Refresh" onPress={fetchData} style={styles.button} color="gray" />
      <Button title="Go back to main menu" onPress={() => navigation.navigate('welcome')} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tableHeaderRow: {
    backgroundColor: '#f2f2f2',
  },
  tableHeader: {
    padding: 10,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f2f2f2',
    flex: 1,
    textAlign: 'center',
  },
  tableCell: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Result;
