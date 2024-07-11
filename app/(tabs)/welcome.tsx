import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome!, this is main menu</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to About menu"
          onPress={() => navigation.navigate('about')}
          color="#ED0800"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Create an Audit"
          onPress={() => navigation.navigate('audit')}
          color="#5783db"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Audit List"
          onPress={() => navigation.navigate('hasil_audit')}
          color="#5adbb5"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  buttonContainer: {
    width: '30%',
    marginVertical: 10,
  },
});

export default Welcome;
