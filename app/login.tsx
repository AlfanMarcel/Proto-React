import React from 'react';
import { View, TextInput, Button, StyleSheet, SafeAreaView, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [mail, setMail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      // Replace with your actual server endpoint
      
      const response = await axios.post('http://192.168.0.112:3000/login', { mail, password }); // Ensure the port matches your backend server
      console.log('Response:', response.data);

      // Assuming the response contains a JWT token
      const { token } = response.data;
      
      // Store the token securely, e.g., AsyncStorage (or other secure storage)
      // await AsyncStorage.setItem('token', token);

      Alert.alert('Success', 'Login successful');
      navigation.navigate('(tabs)'); // Ensure the route name matches your navigation setup
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Error', error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setMail}
          value={mail}
          placeholder='e-mail'
          placeholderTextColor='black'
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          placeholderTextColor='black'
          secureTextEntry={true}
        />
        <Button title="Login" onPress={handleLogin} />
        <Button
          title="Register"
          onPress={() => navigation.navigate('register')}
          color="#003BFF"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '80%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

export default Login;
