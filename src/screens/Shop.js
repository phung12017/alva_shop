import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image, Group, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Fonts } from '../utils/Fonts';



const Json = [
  {

    "_id": "5e99436f3803e03838425ad6",
    "name": "Women",
    "image": "https://www.cargocrew.com.au/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/c/a/cargocrew-uniform-suiting-taylor-navy-womens-pants-1_1.jpg",
    "__v": 0
  },
  {

    "_id": "5e9949c4f2d3a83f20ad340c",
    "name": "Men",
    "image": "https://s7g3.scene7.com/is/image/soloinvest/n01195A?$big_image_web$",
    "__v": 0
  },
  {

    "_id": "5e9949c8f2d3a83f20ad340d",
    "name": "Bag",
    "image": "https://cf.shopee.ph/file/fa89da4bc09f2301595bd475c5c6b675",
    "__v": 0
  },
  {

    "_id": "5f074e226cc7510004eab52d",
    "name": "Shoes",
    "image": "https://www.skechers.com/dw/image/v2/BDCN_PRD/on/demandware.static/-/Library-Sites-SkechersSharedLibrary/default/dwdcaa39ce/images/Landing/men/SKX44314-2020-New-Site-Q2-Content-Grid_M_Athletic-Sneakers_232032-BLOR.jpg?sw=356",
    "__v": 0
  },
  {

    "_id": "5f074e2e6cc7510004eab52e",
    "name": "Watches",
    "image": "https://ae01.alicdn.com/kf/H77cdd4f1b4d44afcb3b07b975066f3bdy/2020-Minimalist-Men-s-Fashion-Ultra-Thin-Watches-Simple-Men-Business-Stainless-Steel-Mesh-Belt-Quartz.jpg",
    "__v": 0
  },

]


const Shop = (params) => {

  const navigation = useNavigation()
  const renderItem = (item) => {
    return (
      <TouchableOpacity style={styles.item}>
        <View style={{ paddingHorizontal: 16, justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Image style={styles.cirImg} source={{ uri: item.image }} />
            <Text style={styles.itemName}>{item.name}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ paddingVertical: 4, paddingHorizontal: 6, backgroundColor: "#E9ECEF", borderRadius: 4 }}>5</Text>
            <Icon name="chevron-right" size={24} color="#000" />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <TouchableOpacity style={styles.btnSearch}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name="search" color="#000" size={24} />
          <Text style={{ marginHorizontal: 8, color: "#a5a5a5", fontFamily: "ProductSans-Regular" }}>Search a product</Text>
        </View>

      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Image
          style={styles.itemImg}
          source={require('../../assets/img/GetUpTo50pc.jpg')}
        />
      </TouchableOpacity>
      <FlatList showsHorizontalScrollIndicator={false}

        data={Json}
        keyExtractor={(item) => String(item._id)}
        renderItem={({ item }) => renderItem(item)}
        horizontal={false}
      />
    </View>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  btnSearch: {
    backgroundColor: "#f4f4f4",
    padding: 12,
    borderRadius: 8,
    marginBottom: 32
  },
  item: {
    width: '100%',
    height: 88,
    backgroundColor: "#f4f4f4",
    borderRadius: 8,
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
  }
})

export default Shop

