import React, { useEffect,useState } from 'react';
import { StatusBar, Text, View, Button, StyleSheet ,TouchableOpacity} from 'react-native';
import database from '@react-native-firebase/database';
import { Fonts } from '../utils/Fonts';
import { FlatList,  } from 'react-native-gesture-handler';



const Profile = () => {

    const [data,setData] = useState([])
    
    
    
    useEffect(() => {
        const onValueChange = database()
            .ref(`/orders`)
            .orderByChild('userId')
            .equalTo("phung12017")
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
            })
        // Stop listening for updates when no longer required
        return () =>
            database()
                .ref(`/categories`)
                .off('value', onValueChange);
    }, []);

    const renderItem = (item) => {
        return (
           <TouchableOpacity style={{padding: 16,backgroundColor:"#f2f2f2",margin:16}}
            onPress={()=>{alert('Làm 1 mình tới đây đuối rồi')}}
           >
               <View>
                    <Text style={{fontSize:16,fontFamily:Fonts.SansBold}}>{item.id}</Text>
                    <View style={{marginVertical:8}}>
                        <Text style={{fontSize:13,fontFamily:Fonts.Sans,color:"#a5a5a5"}}>Order: {convertDate(item.date)}</Text>
                        <Text style={{color:item.status===0?"#27ae60":"#e74c3c",fontFamily:Fonts.Sans}}>{convertStatus(item.status)}</Text>
                    </View>
               </View>
           </TouchableOpacity>
        )
    }

    function convertStatus(status){
        let s = ""
        if(status == 0){
            return s ="Processing"
        } 
        if(status ==1){
            return s = "Cancel"
        }
        
        return s
    }

    function convertDate(date){
        //console.log(date);
        let d = new Date(date)
        //console.log();
        let nD = String(d).substring(15,25)+" "+String(date).substring(0,10) 
        return nD
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <View style={styles.topContainer}>
                <Text style={styles.title}>Profile</Text>
            </View>
            <View padding={16}> 
                <Text style={styles.subTitle}>My Order</Text>
            </View>

            
            <FlatList
                showsVerticalScrollIndicator={false}
             
                data={data}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => renderItem(item)}
                horizontal={false}
            />
        </View>
    )
}






export default Profile

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff"
    },
    topContainer:{
        padding: 16,
        justifyContent:"center",
        alignItems:"center"
    },
    title: {
        fontSize: 20,
        fontFamily: Fonts.SansMedium,
    },
    subTitle:{
        fontFamily:Fonts.SansMedium,
        fontSize:16
    }
});