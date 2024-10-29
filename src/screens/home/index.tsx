import {
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getProductsAction} from '../../redux/config/configAction';
import {images} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/header';
import {toggleWishlist} from '../../redux/config/configSlice';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);  
  const [isAtBottom, setIsAtBottom] = useState(false);
  const Navigation = useNavigation();
  const dispatch = useDispatch();
  const flatListRef = useRef<FlatList<any>>(null);
  const apidata = useSelector((state: any) => {
    return state.mainapi.products;
  });
  const wishlistProducts = useSelector((state: any) => {
    return state.mainapi.wishlistProducts;
  });

  const isLoading = useSelector((state: any) => {
    return state.mainapi.isLoading;
  });

  const gotoProduct = item => {
    Navigation.navigate('Product', {data: item});
  };

  const gotoWishlist = () => {
    Navigation.navigate('Wishlist');
  };

  const gotoCart = () => {
    Navigation.navigate('Cart');
  };

  const addToWishlist = item => {
    dispatch(toggleWishlist(item));
  };

  const isItemInWishlist = itemId => {
    return wishlistProducts.some(product => product.id === itemId);
  };

  const fetchProducts = async () => {
    setRefreshing(true);
    await dispatch(getProductsAction());
    setRefreshing(false);
  };

  const renderItem = ({item, index}: {item: any; index: any}) => {
    const isInWishlist = isItemInWishlist(item.id);

    return (
      <TouchableOpacity
        style={styles.listinside}
        onPress={() => gotoProduct(item)}>
        <View style={styles.imgCont}>
          <TouchableOpacity
            style={styles.likeCont}
            onPress={() => addToWishlist(item)}>
            <Image
              source={isInWishlist ? images.heartFilled : images.heart}
              style={styles.like}
            />
          </TouchableOpacity>
          <Image source={{uri: item.image}} style={styles.img} />
        </View>
        <View style={styles.secondCont}>
          <Text numberOfLines={2} style={styles.titletext}>
            {item.title}
          </Text>
          <Text style={styles.pricetext}>₹{item.price}</Text>
          <View style={styles.ratingview}>
            <Text style={styles.ratetext}>{item.rating.rate} ★</Text>
            <Text style={styles.counttext}>({item.rating.count}+ Reviews)</Text>
          </View>
          <Text numberOfLines={2}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    dispatch(getProductsAction());
  }, []);
  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({animated: true, offset: 0});
  };
  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({animated: true});
  };

  const handleScroll = (event:any) => {
    const offsetY = event.nativeEvent.contentOffset.y; // Current scroll position
    const contentHeight = event.nativeEvent.contentSize.height; // Total content height
    const layoutHeight = event.nativeEvent.layoutMeasurement.height; // Height of the visible area

    setIsAtTop(offsetY === 0);
    setIsAtBottom(offsetY + layoutHeight >= contentHeight);
  };
  return (
    <View style={styles.container}>
      <Header
        heading={'ClothingWala'}
        desc={'Find something that suits you best!'}
        img={false}
        callWishlist={gotoWishlist}
        callCart={gotoCart}
      />
      {!isAtTop && ( <TouchableOpacity style={styles.upButton} onPress={scrollToTop}>
        <Image source={images.up} style={styles.up} />
      </TouchableOpacity>)}
      {!isAtBottom && (<TouchableOpacity onPress={scrollToBottom} style={styles.downButton}>
        <Image source={images.down} style={styles.down} />
      </TouchableOpacity>)}
      
      {apidata.length === 0 ? (
        <Text style={styles.emptyText}>
          Your list is empty! Make sure you are connected with Internet.
        </Text>
      ) : (
        <FlatList
          data={apidata}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ref={flatListRef}
          onScroll={handleScroll}
          ListFooterComponent={<View style={{height: 20}}></View>}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchProducts} />
          }
        />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  listinside: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 15,

    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 14,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  titletext: {
    fontSize: 17,
    fontWeight: '800',
  },
  ratetext: {
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'green',
    borderRadius: 10,
    marginRight: 5,
    padding: 3,
  },
  pricetext: {
    fontSize: SCREEN_WIDTH > 400 ? 25 : 22,
    fontWeight: '600',
    color: 'grey',
    marginTop: 10,
  },

  ratingview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  counttext: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    color: 'grey',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  cartbutton: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: 'black',
    backgroundColor: 'orange',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    margin: 10,
  },

  imgCont: {
    marginVertical: 20,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 14,
  },
  likeCont: {
    alignItems: 'flex-end',
    marginTop: 5,
  },
  like: {
    width: 25,
    height: 25,
  },
  img: {
    height: SCREEN_WIDTH > 400 ? 200 : 150,
    width: SCREEN_WIDTH > 400 ? 100 : 80,
    resizeMode: 'contain',
  },
  secondCont: {
    flex: 2,
    paddingHorizontal: 10,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  up: {
    width: 30,
    height: 30,
  },
  upButton: {
    backgroundColor: '#FBCEB1',
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    top: 150,
    zIndex: 1000,
    borderTopEndRadius:20,
    borderTopStartRadius:20,
  },
  down: {
    width: 30,
    height: 30,
  },
  downButton: {
    backgroundColor: '#FBCEB1',
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius:20,
    borderBottomStartRadius:20,
    position: 'absolute',
    right: 20,
    bottom: 50,
    zIndex: 1000,
  },
});
