import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, StatusBar,Button } from 'react-native';
import database from '@react-native-firebase/database'
import AutoHeightImage from 'react-native-auto-height-image';
import Icon from 'react-native-vector-icons/Feather';
import BadgeIcon from '../components/BadgeIcon';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Text from '../components/Text'
import styled from 'styled-components'
import Recommend from '../components/Recommend';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";

const { width } = Dimensions.get('window')

const Details = ({ route, navigation }) => {

console.log(route);
   const product = route.params

    return (
        
        <View style={styles.container}>
             <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text medium semi>{product.title}</Text>
                <BadgeIcon />
            </View>

            <ScrollView>
                <AutoHeightImage
                    width={width}
                    source={{ uri: product.imageUrl }}
                />
                <View style={{ padding: 16 }}>


                    <View marginBottom={8} style={styles.row}>
                        <Text color="#a5a5a5">{product.category}</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Icon name="star" size={14} color="#f1c40f" />
                            <Text color="#a5a5a5"> 4.5</Text>
                        </View>
                    </View>

                    <View marginBottom={8}>
                        <ProductName >{product.title}</ProductName>
                    </View>

                    <View marginBottom={8}>
                        <View style={styles.row}>
                            <Text medium semi>${product.price}</Text>
                            <Text color="#2ecc71">In stock</Text>
                        </View>
                    </View>

                    <View marginBottom={8}>
                        <Text>Sku: 1000</Text>
                    </View>

                    <View marginBottom={16}>
                        <Text color="#a5a5a5">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                    </View>

                    <TouchableOpacity style={styles.btnItem}>
                        <View style={styles.row}>
                            <Text>Description</Text>
                            <Icon name="chevron-right" size={16} color="#000" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnItem}>
                        <View style={styles.row}>
                            <Text>Reviews</Text>
                            <Icon name="chevron-right" size={16} color="#000" />
                        </View>
                    </TouchableOpacity>

                    <View marginTop={32}>
                        <Text large>You may also like</Text>
                        <Recommend category={product.category} />
                    </View>


                </View>



            </ScrollView>

            <View>
                <TouchableOpacity style={styles.btnAdd} onPress={() => checkExists(product)}>
                    <Text semi color="#fff">Add to cart</Text>
                </TouchableOpacity>
            
            
            </View>

        </View>
    )
}

function checkExists(doc)
{
    database().ref(`/carts/phung12017/${doc.id}/`)
    .once('value',sn=>{
        sn.exists()===true?updateToCart(doc):addToCart(doc)
    })

    showMessage({
        message: "Add to cart success",
        type: "success",
    });

}
function addToCart(doc) {
    database().ref(`/carts/phung12017/${doc.id}/`)
        .set(
            { title:doc.title, num: 1,
                imageUrl:doc.imageUrl,price:doc.price
            }
        )
}

function updateToCart(doc) {
    const reference = database().ref(`/carts/phung12017/${doc.id}/num`);
    return reference.transaction(currentLikes => {
        if (currentLikes === null) return 1;
        return currentLikes + 1;
    });
}


const ProductName = styled(Text)`
    font-size:24px;
`

export default Details;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    image: {
        width: '100%',
        height: 100
    },
    topBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
    },
    btnAdd: {
        padding: 16,
        backgroundColor: "#000",
        alignItems: "center",
        margin: 16,
        borderRadius: 8
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    btnItem: {
        borderBottomColor: "#f2f2f2",
        borderBottomWidth: 1,
        paddingVertical: 16,
    }
});