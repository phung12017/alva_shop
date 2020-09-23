import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Text from "./Text";
import styled from 'styled-components'
import GroupItem from './GroupItem'
import database from '@react-native-firebase/database'
import { TouchableOpacity } from 'react-native-gesture-handler';

 


const BestSeller = () => {
     
    const navigation = useNavigation()
    const [data,setData] = useState()
    const [isLoading, setLoading] = useState(false)


    useEffect(() => {
        let items = []
        const onValueChange = database()
            .ref(`/products`)
            .orderByChild('date')
            .limitToFirst(5)
            .on('value', snapshot => {
                //console.log('User data: ', snapshot);
                snapshot.forEach(element => {
                   let item ={ 
                    id:element.key,
                    category:element.child('category').val(),
                    title:element.child("title").val(),
                    date:element.child('date').val(),
                    imageUrl:element.child('imageUrl').val(),
                    price:element.child('price').val()
                   } 
                   
                   items.push(item)
                });

                setData(items)
              });

        // Stop listening for updates when no longer required
        return () =>
            database()
                .ref(`/products`)
                .off('value', onValueChange);
    }, []);

    
    const renderItem = (item) => {
        return (
            <TouchableOpacity style={styles.item} 
            onPress={()=>navigation.navigate("Details",item)}

            >
                <ItemImg source={{ uri: item.imageUrl }} />
                <ItemTitle>{item.title}</ItemTitle>
                <Text semi medium>${item.price}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <Container>
            <View marginBottom={20}>
            <GroupItem row>
                <Text large semi>Best Seller</Text>
                <TouchableOpacity
                    //onPress={() => navigation.navigate('Product')}
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

export default BestSeller
