import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from "./Text";
import styled from 'styled-components'
import GroupItem from './GroupItem'
import Icon from 'react-native-vector-icons/Feather';


const Json = [
    {

        "_id": "5e99436f3803e03838425ad6",
        "title": "School Kills Artists SS20 Summer Lookbook",
        "des": "Fashion Portraits for the School Kills Artists the Orginals Collection' on Fujifilm X-T1 with analog Helios M44 Lens. All the pictures has been edited in post production to get a retro kind of film look. Shoutout to the model Tristán Ribelles (@tristanribe) for helping us with this project.",
        "cover": "https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/416e0e103220483.5f48043695189.jpg",
        "uploadBy": "admin",
        "createAt": "2019-10-21",

    },

    {

        "_id": "5e99436f3803e03838425fad6",
        "title": "I Met You",
        "des": "Fashion Portraits for the School Kills Artists the Orginals Collection' on Fujifilm X-T1 with analog Helios M44 Lens. All the pictures has been edited in post production to get a retro kind of film look. Shoutout to the model Tristán Ribelles (@tristanribe) for helping us with this project.",
        "cover": "https://mir-s3-cdn-cf.behance.net/project_modules/1400/b782fe103016409.5f43f93486c91.jpg",
        "uploadBy": "Marta Syrko",
        "createAt": "2019-10-21",
        "images": ["1", "2", "3"]
    },
    {

        "_id": "5e99436f3803e03838425ad6",
        "title": "Iceland telephone Summer campaign 2018",
        "des": "Fashion Portraits for the School Kills Artists the Orginals Collection' on Fujifilm X-T1 with analog Helios M44 Lens. All the pictures has been edited in post production to get a retro kind of film look. Shoutout to the model Tristán Ribelles (@tristanribe) for helping us with this project.",
        "cover": "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c803c469687487.5b89aa2a00df5.jpg",
        "uploadBy": "Sveinn Speight",
        "createAt": "2019-10-21",
        "images": ["1", "2", "3"]
    },

]


const Blogs = () => {


    const renderItem = (item) => {
        return (
            <TouchableOpacity>
                <View style={{ flex: 1, margin: 16, flexDirection: "row", }}>
                    <Image source={{ uri: item.cover }} style={{ width: 140, height: 120, borderRadius: 8, marginRight: 16 }} />
                    <View style={{ flex: 1, justifyContent: "space-between", paddingVertical: 18 }}>

                        <View>
                            <Text medium>{item.title}</Text>
                            <TextDate color="#a5a5a5">{item.createAt} </TextDate>
                        </View>


                        <View style={{ flexDirection: "row" }}>
                            <Icon name="share" color="#a5a5a5" size={13} />
                            <Text color="#a5a5a5"> Upload by </Text>
                            <Text semi>{item.uploadBy}</Text>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        )
    }

    return (
        <Container>
            <GroupItem row>

                <Text large semi>Blogs</Text>
                <TouchableOpacity
                //onPress={() => navigation.navigate('Product')}
                >
                    <Text color="#A0A0A0">Show more</Text>

                </TouchableOpacity>
            </GroupItem>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={Json}
                keyExtractor={(item) => String(item._id)}
                renderItem={({ item }) => renderItem(item)}
                horizontal={false}
            />
        </Container>


    )
};

const Container = styled.View`
    flex:1;
    margin:24px 0;
`
const TextDate = styled(Text)`
    margin:8px 0;
`


const styles = StyleSheet.create({
    item: {

        backgroundColor: "#ccc",

    },

});

export default Blogs
