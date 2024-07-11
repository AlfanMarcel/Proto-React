import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button, Alert, Platform } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const Audit = () => {
  const navigation = useNavigation();

  const [id, setId] = useState('');
  const [user_id, setUserId] = useState('');
  const [judul, setJudul] = useState('');
  const [area, setArea] = useState('');
  const [tanggalAudit, setTanggalAudit] = useState(new Date());
  const [tanggalClose, setTanggalClose] = useState(new Date());
  const [showAuditPicker, setShowAuditPicker] = useState(false);
  const [showClosePicker, setShowClosePicker] = useState(false);

  const handleSubmit = () => {
    const auditData = {
      id,
      user_id,
      judul,
      area,
      tanggal_audit: tanggalAudit.toISOString().split('T')[0], // Format the date to YYYY-MM-DD
      tanggal_close: tanggalClose.toISOString().split('T')[0], // Format the date to YYYY-MM-DD
    };

    axios.post('http://192.168.0.112:3000/audit', auditData)
      .then(response => {
        if (response.data.message === 'Audit data inserted successfully') {
          Alert.alert('Success', 'Audit data inserted successfully');
          clearFormFields();
        } else {
          Alert.alert('Error', 'Failed to insert audit data');
        }
      })
      .catch(error => {
        console.error('Error inserting audit data:', error);
        Alert.alert('Error', 'ID audit sama coba isi ID yang berbeda');
      });
  };

  const clearFormFields = () => {
    setId('');
    setUserId('');
    setJudul('');
    setArea('');
    setTanggalAudit(new Date());
    setTanggalClose(new Date());
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
      <Text style={styles.title}>Input Audit Data</Text>
      <TextInput
        style={styles.input}
        placeholder="ID"
        value={id}
        onChangeText={setId}
      />
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
        onValueChange={(value) => setArea(value)}
        items={[
          { label: 'Keuangan', value: 'Keuangan' },
          { label: 'Operasional', value: 'Operasional' },
          { label: 'Sumber Daya Manusia', value: 'Sumber Daya Manusia' },
          { label: 'Teknis', value: 'Teknis'}
        ]}
        placeholder={{
          label: 'Select an area...',
          value: null,
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
      <Button title="Back to Main Menu" onPress={() => navigation.navigate('welcome')}/>
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: '#fff',
    marginBottom: 15,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
});

export default Audit;
