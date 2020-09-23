import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image, StatusBar
} from 'react-native';
import database from '@react-native-firebase/database'
import { Fonts } from '../utils/Fonts';
import Icon from 'react-native-vector-icons/Feather';
import { SwipeListView } from 'react-native-swipe-list-view';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
export default function Basic() {

    const navigation = useNavigation()
    const [listData, setListData] = useState([])
    const [cartTotal, setCartTotal] = useState(0)
    const [priceTotal, setPriceTotal] = useState(0)
    let numberFormat = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(priceTotal)
    
    useEffect(() => {
        const onValueChange = database()
            .ref(`/carts/phung12017`)
            .on('value', snapshot => {
                let list = []
                snapshot.forEach(e => {
                    list.push({
                        id: e.key,
                        ...e.val()
                    })
                })
                var cartTotal = list.reduce(function (prev, cur) {
                    return prev + cur.num;
                }, 0);

                var priceTotal = list.reduce(function (prev, cur) {
                    return prev + (cur.num * cur.price);
                }, 0);



                setListData(list)
                setCartTotal(cartTotal)
                setPriceTotal(priceTotal)
            });

        // Stop listening for updates when no longer required
        return () =>
            database()
                .ref(`/carts/phung12017`)
                .off('value', onValueChange);
    }, []);

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {

        closeRow(rowMap, rowKey);
        database()
            .ref(`carts/phung12017/${rowKey}`).remove()

        // const newData = [...listData];
        // const prevIndex = listData.findIndex(item => item.key === rowKey);
        // newData.splice(prevIndex, 1);
        // setListData(newData);


    };

    const onRowDidOpen = rowKey => {

    };

    const increaseItem = item => {
        const reference = database().ref(`/carts/phung12017/${item.id}/num`);
        return reference.transaction(currentLikes => {
            if (currentLikes === null) return 1;
            return currentLikes + 1;
        });
    }

    const reduceItem = item => {
        const reference = database().ref(`/carts/phung12017/${item.id}/num`);
        return reference.transaction(currentLikes => {
            if (currentLikes === null) return 1;
            if (currentLikes <= 1) return 1;
            return currentLikes - 1;
        });
    }

    const renderItem = data => (
        <View style={styles.rowFront}>
            <View style={styles.rowFrontItem}>
                <Image source={{ uri: data.item.imageUrl }} style={styles.ItemImg} />
                <View style={styles.ItemCol}>
                    <Text style={styles.itemText}>{data.item.title}</Text>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity onPress={() => increaseItem(data.item)}>
                            <Text style={[styles.itemText, styles.paddingX]}>+</Text>
                        </TouchableOpacity>
                        <Text style={[styles.itemText, styles.paddingX]}>{data.item.num}</Text>
                        <TouchableOpacity onPress={() => reduceItem(data.item)}>
                            <Text style={[styles.itemText, styles.paddingX]}>-</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.itemText}>${data.item.price}</Text>
            </View>
        </View>
    );

    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>

            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => deleteRow(rowMap, data.item.id)}
            >
                <Icon name="trash-2" size={24} color="#fff" />
            </TouchableOpacity>

        </View>
    );
    
    if(listData.length>0){
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="#fff" />
    
                <View style={styles.topBar}>
                    <Text style={styles.title}>Cart</Text>
                    <Text style={styles.subTitle}>{cartTotal} item</Text>
                </View>
    
                <View style={styles.row}  >
                    <Text style={styles.total}>Total</Text>
                    <Text style={styles.totalNum}>{numberFormat}</Text>
                </View>
    
                <SwipeListView
                    data={listData}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-75}
                    keyExtractor={(item) => String(item.id)}
                    onRowDidOpen={onRowDidOpen}
    
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
    
                    showsVerticalScrollIndicator={false}
                />
    
             
                <View style={{padding:16}}>
                <TouchableOpacity style={styles.btnCheckout} 
                    onPress={()=>navigation.navigate('Checkout',{
    
                        item:listData,
                        totalPrice:priceTotal
    
                    })}
                >
                    <Text style={styles.textBtn}>Checkout</Text>
                </TouchableOpacity>
                </View>
            </View>
        );
    }
    else{
       return(
        <View flex={1} backgroundColor="#fff" justifyContent="center" alignItems="center" >
            <Text>No item in your cart</Text>
        </View>
       )
    }
    
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        backgroundColor: '#fff',
        flex: 1,
        borderBottomColor: "#eee",
        borderBottomWidth: 1
    },
    rowFrontItem: {
        flexDirection: "row",
        padding: 16,
    }
    ,
    rowBack: {

        backgroundColor: '#fff',
        flex: 1,


    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },

    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
        bottom: 0,
        top: 0
    },

    ItemImg: {
        width: 80,
        height: 100,
        borderRadius: 4
    },
    ItemCol: {
        flex: 1,
        justifyContent: "space-between",
        marginHorizontal: 16
    },
    itemText: {
        fontSize: 16,
        fontFamily: Fonts.Sans
    },
    paddingX: {
        padding: 8
    },
    title: {
        fontSize: 20,
        fontFamily: Fonts.SansMedium
    },
    subTitle: {
        fontSize: 14,
        fontFamily: Fonts.Sans,
        color: "#a5a5a5"
    },
    total: {
        fontSize: 16,
        fontFamily: Fonts.Sans
    },
    totalNum: {
        fontSize: 24,
        fontFamily: Fonts.SansMedium
    },
    topBar: {
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 8,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        marginBottom: 16
    },
    btnCheckout: {
        padding: 16,
        backgroundColor: "#000",
        alignItems:"center"
  ,borderRadius:8  },
    textBtn: {
        color: "#Fff",
        fontFamily: Fonts.SansMedium,
        fontSize: 14,
    }
});
