import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {  StyleSheet,   View } from 'react-native';
import Text from "../components/Text";
import styled from 'styled-components'
import GroupItem from '../components/GroupItem'
import database from '@react-native-firebase/database'
import { ActivityIndicator } from 'react-native-paper';
import {TouchableOpacity,FlatList} from 'react-native-gesture-handler'
 



const Categories = () => {

    const navigation = useNavigation()

    const [isLoading, setLoading] = useState(false)
    const [data, setData] = useState()

    useEffect(() => {
        getCategories()
    }, []);





    const getProductByCate = (item) => {
      
        navigation.navigate("Product",{item:item})
    }



    function getCategories() {
        setLoading(true)
        let items = []
        const onValueChange = database()
            .ref(`/categories`)
            .on('value', snapshot => {
                //console.log('User data: ', snapshot.val());
               
                snapshot.forEach(e => {

                    let item = {
                        id:e.key,
                        title:e.child('title').val(),
                        imageUrl:e.child('imageUrl').val()
                    }    
                    items.push(item)
                    //console.log(item);

                });
                
                setLoading(false)
                setData(items)
            });
    

        // Stop listening for updates when no longer required
        return () =>
            database()
                .ref(`/categories`)

                .off('value', onValueChange);

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
            {isLoading==true?<ActivityIndicator/>:null}
       
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
