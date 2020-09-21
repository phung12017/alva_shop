import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Button, Image, Group, Dimensions, ScrollView, TouchableOpacity, ImageBackground, StatusBar } from 'react-native';
import Text from '../components/Text'
import GroupItem from '../components/GroupItem'
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components'
import MyCarousel from '../components/MyCarousel ';
import Categories from "../components/Categories";
import BestSeller from '../components/BestSeller';
import NewArrival from '../components/NewArrival';
import Blogs from '../components/Blogs';
import BadgeIcon from '../components/BadgeIcon';



const { width } = Dimensions.get('window');


const Home = () => {

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <GroupItem row >
        <GroupItem row>
          <Text title bold>Alva </Text>
          <Text subTitle light>Shop</Text>
        </GroupItem>

      <BadgeIcon/>
        
      </GroupItem>

      <ScrollView showsVerticalScrollIndicator={false}>
        <MyCarousel />
        <Categories />
        <BestSeller />
        <ImageBackground source={{uri:"https://mir-s3-cdn-cf.behance.net/project_modules/1400/4d504066241211.5b257eb6df63d.jpg"}} style={{ width: width, height: width - 160, backgroundColor: "#000", marginVertical: 24 }}>
        </ImageBackground>
        <NewArrival />
  
        <ImageBackground source={{ uri: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/c752eb102276713.5f5a6bdb67a5f.jpg" }} style={styles.midBanner} >
          <TouchableOpacity style={styles.btnShopSale}>
            <Text medium>Shop Sales</Text>
          </TouchableOpacity>
        </ImageBackground>


        <View style={{backgroundColor:"#f2f2f2",justifyContent:"center",alignItems:"center",padding: 18,}}>
          <Text semi>Free Shipping & Free Return</Text>
        </View>

        <Blogs />
      </ScrollView>

    </View>
  )
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
  ,
  midBanner: {
    marginHorizontal: 16,
    height: width/2+20,
     borderRadius: 8,
    overflow:"hidden",
    marginVertical:24,
    justifyContent:"center",
    alignItems:"center"
  },
  btnShopSale:{
    backgroundColor:"#fff",
    paddingHorizontal:26,
    paddingVertical:12,
    position:"absolute",
    borderRadius:4
  }
})

export default Home
