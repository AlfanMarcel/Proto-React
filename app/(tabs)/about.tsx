// Welcome.tsx

import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const About = () => {
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome! this is about menu</Text>
      <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
      <Button title="Go back to main menu" onPress={() => navigation.navigate('welcome')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default About;
