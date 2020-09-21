/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React from 'react';

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

//Icon
import Icon from 'react-native-vector-icons/Feather';


//Screens
import Profile from './src/screens/Profile';
import Home from './src/screens/Home';
import Shop from './src/screens/Shop';
import Cart from './src/screens/Cart';

//Create Navigator
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

//My Stack
function MyStack() {
  return (
    <Stack.Navigator headerMode="none"> 
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}


//
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={{backgroundColor:"#fff",
     }}
      tabBarOptions={{
        activeTintColor: '#e91e63',
        
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={24} />
          ),
        }}
      
      />
        <Tab.Screen
        name="Shop"
        component={Shop}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" color={color} size={24} />
          ),
        }}
         
      />
      <Tab.Screen
         name="Cart"
        component={Cart}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color, size }) => (
            <Icon name="bell" color={color} size={24} />
          ),
          tabBarBadge: null,
        }}
      />
        <Tab.Screen
        name="Me"
        component={Profile}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={24} />
          ),
        }}
      />
       
    </Tab.Navigator>
  );
}

const App = () => {
Profile
  return (
   <NavigationContainer>
     <MyTabs/>
   </NavigationContainer>
  );
};

 
export default App;
