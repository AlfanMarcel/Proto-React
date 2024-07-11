
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './login'; // Adjust path if necessary
import Welcome from './(tabs)/welcome'; // Adjust path if necessary
import About from './(tabs)/about';
import Audit from './(tabs)/audit';
import Result from './(tabs)/hasil_audit';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Audit" component={Audit} />
        <Stack.Screen name="Result" component={Result} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

