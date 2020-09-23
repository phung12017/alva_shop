import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Group, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Fonts } from '../utils/Fonts';
import { ScrollView, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database'




const Shop = (params) => {

  const navigation = useNavigation()

  const [data, setData] = useState([])
  useEffect(() => {
    const onValueChange = database()
      .ref(`/categories`)
      .on('value', snapshot => {
        let list = []
        snapshot.forEach(e => {
          list.push({
            id: e.key,
            ...e.val()
          })
        })

        // console.log(list);
        setData(list)
      });

    // Stop listening for updates when no longer required
    return () =>
      database()
        .ref(`/categories`)
        .off('value', onValueChange);
  }, []);

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={styles.item}
        onPress={() => navigation.navigate("Product", { item: item })}
      >
        <View style={{ paddingHorizontal: 16, justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Image style={styles.cirImg} source={{ uri: item.imageUrl }} />
            <Text style={styles.itemName}>{item.title}</Text>
          </View>
          <View style={styles.row}>
            <Icon name="chevron-right" size={24} color="#000" />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View padding={16}>
        <TouchableOpacity style={styles.btnSearch}>
          <View style={styles.searchRow}>
            <Icon name="search" color="#000" size={24} />
            <Text style={styles.searchText}>Search a product</Text>
          </View>

        </TouchableOpacity>

      </View>

      <ScrollView showsVerticalScrollIndicator={false} paddingHorizontal={16}>
        <TouchableOpacity style={styles.item} >
          <Image
            style={styles.itemImg}
            source={require('../../assets/img/GetUpTo50pc.jpg')}
          />
        </TouchableOpacity>
        <FlatList showsHorizontalScrollIndicator={false}

          data={data}
          keyExtractor={(item) => String(item._id)}
          renderItem={({ item }) => renderItem(item)}
          horizontal={false}
        />
      </ScrollView>

    </View>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

  },
  btnSearch: {
    backgroundColor: "#f4f4f4",
    padding: 12,
    borderRadius: 8,

  },
  searchText: {
    marginHorizontal: 8,
    color: "#a5a5a5",
    fontFamily: "ProductSans-Regular"
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  item: {
    width: '100%',
    height: 90,
    backgroundColor: "#f4f4f4",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    justifyContent: "center", alignContent: "center"
  },
  itemImg: {
    width: '100%',
    height: 88,
    resizeMode: "cover"
  },
  cirImg: {
    width: 70,
    height: 70,
    borderRadius: 888,

  }
  ,
  itemName: {
    fontSize: 16,
    fontFamily: Fonts.Sans,
    marginLeft: 16
  },
  row: { flexDirection: "row", justifyContent: "center", alignItems: "center" }
})

export default Shop

