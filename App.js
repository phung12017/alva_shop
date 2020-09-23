/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native'
//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Icon
import Icon from 'react-native-vector-icons/Feather';

//DataBase 
import database from '@react-native-firebase/database'

//Screens
import Profile from './src/screens/Profile';
import Home from './src/screens/Home';
import Shop from './src/screens/Shop';
import Cart from './src/screens/Cart';
import Product from './src/screens/Product';
import Details from './src/screens/Details';
import Checkout from './src/screens/Checkout';


//Create Navigator
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

 

//My Stack
function HomeStack({ navigation, route }) {

  if (route.state && route.state.index > 0) {
    navigation.setOptions({ tabBarVisible: false })
  } else {
    navigation.setOptions({ tabBarVisible: true })
  }


  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}


function ShopStack({ navigation, route }) {

  if(route.state && route.state.index >0){
     navigation.setOptions({tabBarVisible:false})
  }else{
    navigation.setOptions({tabBarVisible:true})
  }


  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Shop" component={Shop} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}

function CartStack({ navigation, route }) {
  
  if (route.state && route.state.index > 0) {
    navigation.setOptions({ tabBarVisible: false })
  } else {
    navigation.setOptions({ tabBarVisible: true })
  }
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Checkout" component={Checkout} />
  
    </Stack.Navigator>
  );
}
//options Bottom Tabs

const options = {
  activeTintColor: '#222',
  showLabel: false,
  backBehavior: false,
  initialRouteName: "Home",


}

function MyTabs() {


  const [num, setNum] = useState(10)


  useEffect(() => {
    const onValueChange = database()
      .ref(`/carts/phung12017`)
      .on('value', snapshot => {
        let list = []
        snapshot.forEach(e => {
          list.push({
            id: e.key,
            ...e.val()
          })
        })
        var cartTotal = list.reduce(function (prev, cur) {
          return prev + cur.num;
        }, 0);
        setNum(cartTotal)
      });

    // Stop listening for updates when no longer required
    return () =>
      database()
        .ref(`/users/phung12017`)
        .off('value', onValueChange);
  }, [])



  return (
    <Tab.Navigator tabBarOptions={options}


    >
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
        component={ShopStack}
        options={{


          tabBarIcon: ({ color, size }) => (
            <Icon name="search" color={color} size={24} />
          ),

        }}

      />
      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={{

          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-bag" color={color} size={24} />
          ),
          tabBarBadge: num

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
      <MyTabs />
    </NavigationContainer>
  );
};

 
 export default App
 