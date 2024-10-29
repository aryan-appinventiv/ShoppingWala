import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import { images } from '../../assets/images'

const Splash = () => {
    const Navigation = useNavigation();
    useEffect(() => {
       setTimeout(() => {
         Navigation.navigate('Home');
       }, 1500);
      }, []);
  return (
    <View style={styles.container}>
      <ImageBackground source={images.cart} style={styles.img}/>
      <Text style={styles.text}>ShoppingWala</Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FBCEB1',
    },
    img:{
        height:100,
        width:100,
    },
    text:{
        marginTop:20,
        fontSize:20,
        fontWeight:'bold',

    }
})