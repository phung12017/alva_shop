import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Fonts } from '../utils/Fonts';
import database from '@react-native-firebase/database'
import { useNavigation } from '@react-navigation/native';

const Recommend = (props) => {
    //console.log(props.category);
    const category = props.category
    const [data,setData] = useState([])
    const navigation = useNavigation()

    useEffect(() => {
        const onValueChange = database()
            .ref(`/products`)
            .orderByChild('category').equalTo(category)
            .limitToLast(5)           
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
                onPress={()=>   navigation.navigate("Details",{item:item})}
            
            >

                <Image source={{ uri: item.imageUrl }} style={styles.image} />
                <View style={styles.col}>
                    <Text style={styles.name}>{item.title}</Text>
                    <Text style={styles.price}>${item.price}</Text>
                </View>

            </TouchableOpacity>
        )
    }
    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            data={data}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => renderItem(item)}
            horizontal={true}
        />
    )


}

export default Recommend;

const styles = StyleSheet.create({
    item: {
        marginTop: 16,
        marginRight: 16
    }
    , image: {
        width: 150,
        height: 180,
        borderRadius: 8,

    },
    name: {
        fontFamily: Fonts.Sans,
        color: "#a5a5a5",

    },
    price: {
        fontFamily: Fonts.SansMedium,
        fontSize: 16
    }, col: {

        marginTop: 8
    }
});