import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button, Alert, Platform } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

type EditAuditRouteParams = {
  id: string;
};

const EditAudit = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const { id } = route.params as EditAuditRouteParams;

  const [user_id, setUserId] = useState('');
  const [judul, setJudul] = useState('');
  const [area, setArea] = useState('');
  const [tanggalAudit, setTanggalAudit] = useState(new Date());
  const [tanggalClose, setTanggalClose] = useState(new Date());
  const [showAuditPicker, setShowAuditPicker] = useState(false);
  const [showClosePicker, setShowClosePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.0.112:3000/edit?id=${id}`);
        const auditData = response.data;
        setUserId(auditData.user_id);
        setJudul(auditData.judul);
        setArea(auditData.area);
        setTanggalAudit(new Date(auditData.tanggal_audit));
        setTanggalClose(new Date(auditData.tanggal_close));
      } catch (error) {
        console.error('Error fetching audit data:', error); // Log the entire error object for debugging
        Alert.alert('Error', 'Failed to fetch audit data');
      } finally {
        setIsLoading(false);
      }
    };
  
    if (id) {
      fetchData();
    } else {
      console.error('ID is not defined');
      Alert.alert('Error', 'ID is not defined');
    }
  }, [id]);  

  const handleSubmit = async () => {
    const auditData = {
      user_id,
      judul,
      area,
      tanggal_audit: tanggalAudit.toISOString().split('T')[0],
      tanggal_close: tanggalClose.toISOString().split('T')[0],
    };
  
    try {
      const response = await axios.put(`http://192.168.0.112:3000/edit?id=${id}`, auditData);
      if (response.data.message === 'Audit data updated successfully') {
        Alert.alert('Success', 'Audit data updated successfully');
        navigation.navigate('hasil_audit');
      } else {
        Alert.alert('Error', 'Failed to update audit data');
      }
    } catch (error) {
      console.error('Error updating audit data:', error);
      Alert.alert('Error', 'An error occurred while updating audit data');
    }
  };
  

  const showDatePicker = (type) => {
    if (type === 'audit') {
      setShowAuditPicker(true);
    } else if (type === 'close') {
      setShowClosePicker(true);
    }
  };

  const onChangeAuditDate = (event, selectedDate) => {
    const currentDate = selectedDate || tanggalAudit;
    setShowAuditPicker(Platform.OS === 'ios');
    setTanggalAudit(currentDate);
  };

  const onChangeCloseDate = (event, selectedDate) => {
    const currentDate = selectedDate || tanggalClose;
    setShowClosePicker(Platform.OS === 'ios');
    setTanggalClose(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Audit Data</Text>
      <TextInput
        style={styles.input}
        placeholder="User ID"
        value={user_id}
        onChangeText={setUserId}
      />
      <TextInput
        style={styles.input}
        placeholder="Judul"
        value={judul}
        onChangeText={setJudul}
      />
      <RNPickerSelect
  value={area || ''}
  onValueChange={(value) => setArea(value)}
  items={[
    { label: 'Keuangan', value: 'Keuangan' },
    { label: 'Operasional', value: 'Operasional' },
    { label: 'Sumber Daya Manusia', value: 'Sumber Daya Manusia' },
    { label: 'Teknis', value: 'Teknis' }
  ]}
  placeholder={{
    label: 'Select an area...',
    value: ''
  }}
  style={pickerSelectStyles}
/>
      <Text>Select Tanggal Audit</Text>
      <TouchableOpacity style={styles.input} onPress={() => showDatePicker('audit')}>
        <Text>{tanggalAudit.toISOString().split('T')[0]}</Text>
      </TouchableOpacity>
      {showAuditPicker && (
        <DateTimePicker
          value={tanggalAudit}
          mode="date"
          display="default"
          onChange={onChangeAuditDate}
        />
      )}
      <Text>Select Tanggal Close</Text>
      <TouchableOpacity style={styles.input} onPress={() => showDatePicker('close')}>
        <Text>{tanggalClose.toISOString().split('T')[0]}</Text>
      </TouchableOpacity>
      {showClosePicker && (
        <DateTimePicker
          value={tanggalClose}
          mode="date"
          display="default"
          onChange={onChangeCloseDate}
        />
      )}
      <Button title="Submit" onPress={handleSubmit} color='#ED0800' />
      <Button title="Back to Main Menu" onPress={() => navigation.navigate('welcome')} />
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 20,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default EditAudit;
