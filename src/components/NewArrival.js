import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Text from "./Text";
import styled from 'styled-components'
import GroupItem from './GroupItem'

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


const NewArrival = () => {
     
    const navigation = useNavigation()
    const getProductByCate = (item) => {
        console.log(item._id);
    }
    const renderItem = (item) => {
        return (
            <TouchableOpacity style={styles.item} onPress={() => getProductByCate(item)}>
                <ItemImg source={{ uri: item.image }} />
                <ItemTitle>{item.name}</ItemTitle>
                <Text semi medium>$300</Text>

            </TouchableOpacity>
        )
    }

    return (
        <Container>
            <GroupItem row>

                <Text large semi>New Arrival</Text>
                <TouchableOpacity
                    //onPress={() => navigation.navigate('Product')}
                >
                    <Text color="#A0A0A0">Show more</Text>

                </TouchableOpacity>
            </GroupItem>
            <FlatList
                showsHorizontalScrollIndicator={false}
                paddingHorizontal={8}
                data={Json}
                keyExtractor={(item) => String(item._id)}
                renderItem={({ item }) => renderItem(item)}
                horizontal={true}
            />
        </Container>


    )
};

const Container = styled.View`
    flex:1;
    margin:24px 0;
`

 

const ItemTitle = styled(Text)`
    margin:8px 0;
`
const ItemImg = styled.Image`
    width:250px;
    border-radius:8px;
    height:350px;
   
`

const styles = StyleSheet.create({
    item: {
        justifyContent: "center",
        alignItems: 'center',
        paddingHorizontal: 8

    }
});

export default NewArrival
