import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../../redux/config/configSlice'; 
import Header from '../../components/header';
import { useNavigation } from '@react-navigation/native';

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistProducts = useSelector((state) => state.mainapi.wishlistProducts); 
  const Navigation = useNavigation(); 

  const removeFromWishlist = (item) => {
    dispatch(toggleWishlist(item)); 
  };
  const gotoWishlist=()=>{
    Navigation.navigate('Wishlist');
  }
  const gotoCart=()=>{
    Navigation.navigate('Cart');
  }
  const goback = () => {
    Navigation.goBack();
  };
  const gotoProduct = item => {
    Navigation.navigate('Product', {data: item});
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={()=>gotoProduct(item)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
        <TouchableOpacity onPress={() => removeFromWishlist(item)}>
          <Text style={styles.removeButton}>Remove from Wishlist</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header
        heading={'Your Wishlist'}
        desc={'Hurry up!'}
        img={true}
        callWishlist={gotoWishlist}
        callCart={gotoCart}
        onPress={goback}
      />
      {wishlistProducts.length === 0 ? (
        <Text style={styles.emptyText}>Your wishlist is empty!</Text>
      ) : (
        <FlatList
          data={wishlistProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  price: {
    fontSize: 16,
    color: 'grey',
  },
  removeButton: {
    color: 'red',
    marginTop: 5,
  },
});

export default Wishlist;
