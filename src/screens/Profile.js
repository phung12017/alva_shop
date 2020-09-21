import React, { useEffect } from 'react';
import { StatusBar, Text, View ,Button} from 'react-native';
import database from '@react-native-firebase/database';
 


 

const Profile = () => {

     
 
      

    return (
        <View>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <Text>Profile</Text>
        
            <Button title="T" onPress={()=>AutoWrite()}/>
        </View>
    )
}

 

 
 

export default Profile