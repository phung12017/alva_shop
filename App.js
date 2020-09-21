/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React from 'react';
import 'react-native-gesture-handler';

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Icon
import Icon from 'react-native-vector-icons/Feather';


//Screens
import Profile from './src/screens/Profile';
import Home from './src/screens/Home';
import Shop from './src/screens/Shop';
import Cart from './src/screens/Cart';
import Product from './src/screens/Product';

//Create Navigator
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//My Stack
function HomeStack({navigation,route}) {

  if(route.state && route.state.index >0){
     navigation.setOptions({tabBarVisible:false})
  }else{
    navigation.setOptions({tabBarVisible:true})
  }

 
  return (
    <Stack.Navigator headerMode="none"> 
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Product" component={Product}  />
    </Stack.Navigator>
  );
}




//

const options = {
  activeTintColor: '#222',
  showLabel:false,
  backBehavior:false,
  initialRouteName:"Home",

}

function MyTabs() {
  return (
    <Tab.Navigator tabBarOptions={options}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={24} />
          ),
        }}
      
      />
        <Tab.Screen
        name="Shop"
        component={Shop}
        options={{
       
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" color={color} size={24} />
          ),
        }}
         
      />
      <Tab.Screen
         name="Cart"
        component={Cart}
        options={{
        
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-bag" color={color} size={24} />
          ),
      
        }}
      />
        <Tab.Screen
        name="Me"
        component={Profile}
        options={{
      
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={24} />
          ),
        }}
      />
       
    </Tab.Navigator>
  );
}

const App = () => {
 
  return (
   <NavigationContainer>
     <MyTabs/>
   </NavigationContainer>
  );
};

 
export default App;
