import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Button } from 'react-native';
import { FlatList, ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import { Fonts } from '../utils/Fonts';
import database from '@react-native-firebase/database'

const Checkout = ({ route }) => {
    const navigation = useNavigation()

    const [visible, setVisible] = useState(false)

    const items = route.params.item
    const { totalPrice } = route.params
    const userId = "phung12017"


    const [phone, setPhone] = useState("0764533071")
    const [name, setName] = useState("Phung")
    const [streetAddress, setStreetAddress] = useState("Vinh Phu")

    const renderItem = (item) => {
        return (
            <View style={styles.row2}>
                <View flex={1} padding={8}>

                    <Text>{item.title} x {item.num}</Text>
                </View>
                <View flex={1} padding={8}>
                    <Text> {item.num * item.price} $</Text>
                </View>
            </View>
        )
    }




    function placeOrder(userId, name, phone, streetAddress, item, totalPrice) {

        const order = {
            userId: userId,
            name: name,
            phone: phone,
            date: new Date(),
            totalPrice: totalPrice,
            streetAddress: streetAddress,
            items: item,
            status: 0
        }

        database().ref('orders').push(order).then(() => {
            alert("Place order success")
            database().ref('carts/phung12017').set({})
            setName('')
            setStreetAddress('')
            setPhone('')
            navigation.goBack()
        })


    }


    return (

        <View style={styles.container}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />

            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Checkout</Text>
                <View style={{ width: 24, height: 24 }} ></View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View padding={16} >
                    <Text style={styles.large}>Billing Details</Text>

                    <View style={styles.group}>
                        <Text style={styles.small}>Fullname <Text style={{ color: "#e74c3c" }}>*</Text></Text>
                        <TextInput
                            style={styles.input}
                            value={name} />
                    </View>

                    <View style={styles.group}>
                        <Text style={styles.small}>Street address <Text style={{ color: "#e74c3c" }}>*</Text></Text>
                        <TextInput style={styles.input}
                            value={streetAddress}
                        />
                    </View>

                    <View style={styles.group}>
                        <Text style={styles.small}>Phone <Text style={{ color: "#e74c3c" }}>*</Text></Text>
                        <TextInput style={styles.input} keyboardType='numeric'
                            value={phone}
                        />
                    </View>
                </View>

                <View padding={16} >
                    <Text style={styles.large}>Your Order</Text>
                    <View style={styles.row}>
                        <View flex={1} padding={8}>
                            <Text style={styles.semi}>Product</Text>
                        </View>
                        <View flex={1} padding={8}>
                            <Text style={styles.semi}>Subtotal</Text>
                        </View>
                    </View>


                    <FlatList
                        showsVerticalScrollIndicator={false}

                        data={items}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({ item }) => renderItem(item)}
                        horizontal={false}
                    />

                    <View style={styles.row}>
                        <View flex={1} padding={8}>
                            <Text>Total</Text>
                        </View>
                        <View flex={1} padding={8}>
                            <Text style={styles.semi}> {totalPrice} $</Text>
                        </View>
                    </View>
                </View>


                <TouchableOpacity style={styles.btnPlaceOrder}

                    onPress={() => placeOrder(userId, name, phone, streetAddress, items, totalPrice)}
                >
                    <Text style={[styles.semi, styles.colorWhite]}>Place order</Text>
                </TouchableOpacity>

            </ScrollView>

        </View>
    )
};




export default Checkout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    topBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontFamily: Fonts.SansMedium
    },
    large: {
        fontSize: 20,
        fontFamily: Fonts.Sans,
        marginBottom: 12
    },
    small: {
        fontSize: 14,
        fontFamily: Fonts.SansMedium,
        marginBottom: 8,
        color: "#a5a5a5"
    },
    input: {
        borderWidth: 1,
        borderColor: "#a5a5a5",
        paddingHorizontal: 12,
        fontFamily: Fonts.Sans,
        fontSize: 16,
        borderRadius: 4,
        height: 44
    },
    group: {
        marginVertical: 8
    },
    row: {
        flex: 1,
        backgroundColor: "#ddd",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        padding: 8,

    },
    row2: {
        flex: 1,
        backgroundColor: "#eee",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        padding: 8,

    },
    semi: {
        fontFamily: Fonts.SansMedium,
        fontSize: 15
    },
    colorWhite: { color: "#fff" }
    ,
    btnPlaceOrder: {
        backgroundColor: "#000",
        borderRadius: 4,
        alignItems: "center",
        padding: 16,
        margin: 16
    }
});
