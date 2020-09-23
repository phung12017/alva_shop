import React, { useEffect, useState } from 'react';
import { StatusBar, View, Button, StyleSheet, Dimensions, Image } from 'react-native';
import database from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';
import Text from '../components/Text'

import Icon from 'react-native-vector-icons/Feather';
import BadgeIcon from '../components/BadgeIcon';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
const { width } = Dimensions.get('window')



const Product = ({ route, navigation }) => {

    const { title, id } = route.params.item
    const [data, setData] = useState()

    useEffect(() => {
        const onValueChange = database()
            .ref(`/products`)
            .orderByChild('category').equalTo(title)
            .on('value', snapshot => {
                let list = []
                snapshot.forEach(doc => {
                    list.push({
                        id: doc.key,
                        ...doc.val()
                    })
                })

                // console.log(list);
                setData(list)
            });

        // Stop listening for updates when no longer required
        return () =>
            database()
                .ref(`/products`)
                .off('value', onValueChange);
    }, []);

  

    const renderItem = (item) => {
        return (
            <TouchableOpacity onPress={()=>navigation.navigate('Details',item)} >
                <View style={styles.item} >
                    <Image source={{ uri: item.imageUrl }} style={styles.itemImg} />
                    <Text marginBottom={8} small color="#707070">{item.title}</Text>
                    <Text bold>${item.price}</Text>
                </View>
            </TouchableOpacity>
        )
    }


    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <View style={{ justifyContent: "space-between", alignItems: "center", padding: 16, flexDirection: "row" }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text large semi>{title}</Text>
                <BadgeIcon />
            </View>

            <FlatList
                showsVerticalScrollIndicator={true}
                numColumns={2}
                data={data}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => renderItem(item)}
            />
        </View>
    )
}



export default Product
const styles = StyleSheet.create({
    item: {

        width: width / 2,
        height: width / 2 + 70,
        padding: 8,
        marginBottom: 8


    },
    itemImg: {
        flex: 1,
        resizeMode: "cover",
        borderRadius: 8,
        marginBottom:8

    }
});