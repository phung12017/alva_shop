import React, { Component, useEffect, useState } from 'react';
import { View, Text ,StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import database from '@react-native-firebase/database'
import { useNavigation } from '@react-navigation/native';

const BadgeIcon = () => {
    const navigation = useNavigation()

    const [numChildren,setNumChildren] = useState(0)

    useEffect(() => {
        const onValueChange = database()
            .ref(`/carts/phung12018`)
            .on('value', snapshot => {
                 setNumChildren(snapshot.numChildren())    
            });

        // Stop listening for updates when no longer required
        return () =>
            database()
                .ref(`/users/phung12018`)
                .off('value', onValueChange);
    }, []);
    return (
        <TouchableOpacity style={{ position: "relative" }}
            onPress={()=>navigation.navigate('Cart')}    
         >
            <Icon name="shopping-bag" size={24} />
           
            {numChildren>0?<View style={styles.dot}></View>:null}
          
        </TouchableOpacity>
    );
}
export default BadgeIcon

const styles = StyleSheet.create({
    dot:{ position: "absolute", bottom: 0, left: 0, width: 8, height: 8, borderRadius: 8, backgroundColor: "#e74c3c" }
});