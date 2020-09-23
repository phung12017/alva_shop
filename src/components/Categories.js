import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Text from "../components/Text";
import styled from 'styled-components'
import GroupItem from '../components/GroupItem'
import database from '@react-native-firebase/database'
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler'

const Categories = () => {
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




    const getProductByCate = (item) => {

        navigation.navigate("Product", { item: item })
    }





    const renderItem = (item) => {

        return (
            <TouchableOpacity style={styles.item} onPress={() => getProductByCate(item)}>
                <ItemImg source={{ uri: item.imageUrl }} />
                <ItemTitle >{item.title}</ItemTitle>
            </TouchableOpacity>
        )
    }

    return (
        <Container>

            <View marginBottom={20} >

                <GroupItem row>

                    <Text large semi>Categories</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Shop')}
                    >
                        <Text color="#A0A0A0">Show more</Text>

                    </TouchableOpacity>
                </GroupItem>
            </View>

            <FlatList
                showsHorizontalScrollIndicator={false}
                paddingHorizontal={8}
                data={data}
                keyExtractor={(item) => String(item.id)}
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

const Title = styled(Text)`
    margin:16px ;
`

const ItemTitle = styled(Text)`
    margin:8px 0;
`
const ItemImg = styled.Image`
    width:100px;
    border-radius:8px;
    height:100px;
   
`

const styles = StyleSheet.create({
    item: {
        justifyContent: "center",
        alignItems: 'center',
        paddingHorizontal: 8

    }
});

export default Categories
