import React, { useEffect, useState } from 'react';
import { StatusBar, Text, View, StyleSheet } from 'react-native';
import database from '@react-native-firebase/database'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import BadgeIcon from '../components/BadgeIcon';
import { Fonts } from '../utils/Fonts';

const Cart = () => {
    const [data, setData] = useState([])
    const [cartTotal, setCartTotal] = useState(0)
    const [priceTotal, setPriceTotal] = useState(0)

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

                var priceTotal = list.reduce(function (prev, cur) {
                    return prev + (cur.num * cur.price);
                }, 0);
                
                setData(list)
                setCartTotal(cartTotal)
                setPriceTotal(priceTotal)
            });

        // Stop listening for updates when no longer required
        return () =>
            database()
                .ref(`/carts/phung12017`)
                .off('value', onValueChange);
    }, []);


    const renderItem = (item) => {
        return (
            <View>
                <Text>fasfas</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <View style={styles.topBar}>
                <Text style={styles.title}>Cart</Text>
                <Text style={styles.subTitle}>{cartTotal} item</Text>
            </View>

            <View style={styles.row}  >
                <Text style={styles.total}>Total</Text>
                <Text style={styles.totalNum}>${priceTotal}</Text>
            </View>

            <FlatList
                data={data}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => renderItem(item)}
            />




        </View>
    )
}

export default Cart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },

    title: {
        fontSize: 16,
        fontFamily: Fonts.SansMedium
    },
    subTitle: {
        fontSize: 14,
        fontFamily: Fonts.Sans,
        color: "#a5a5a5"
    },
    total: {
        fontSize: 16,
        fontFamily: Fonts.Sans
    },
    totalNum: {
        fontSize: 24,
        fontFamily: Fonts.SansMedium
    },
    topBar: {
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 8,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
    },
    btnItem: {
        borderBottomColor: "#f2f2f2",
        borderBottomWidth: 1,
        paddingVertical: 16,
    },
    btnAdd: {
        padding: 16,
        backgroundColor: "#000",
        alignItems: "center",
        margin: 16,
        borderRadius: 8
    },
});