import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import img1 from '../../assets/images/heart.png';
import img2 from '../../assets/images/fruits.png';
import { InterFont } from '../../styles/CustomStyles';

const { width, height } = Dimensions.get('window');

const WishlistScreen = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleBackPress}>
              <AntDesign name="arrowleft" size={30} color="#fff" style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity>
              <FontAwesome name="shopping-cart" size={30} color="#fff" style={styles.icon} />
            </TouchableOpacity>
          </View>

          <View style={styles.imageContainer}>
            <Image source={img1} style={styles.Image} />
          </View>
        </View>

        <View style={styles.main}>
          <View style={styles.FavProdcut}>
            <Text style={styles.FavText}>Favorite Products(4)</Text>
          </View>

          <View style={styles.productRow}>
            <View style={styles.productInfoContainer}>
              <View>
                <Image source={img2} />
              </View>

              <View>
                <View>
                  <Text style={styles.productName}>Carrot</Text>
                  <Text style={styles.productWeight}>1KG</Text>
                </View>

                <View style={styles.iconRow}>
                  <TouchableOpacity>
                    <AntDesign name="eyeo" size={20} color="#292D32" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <AntDesign name="heart" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View>
              <TouchableOpacity>
                <FontAwesome name="shopping-cart" size={30} color="#000" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#ACE03A',
    height: height * 0.25,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  iconContainer: {
    top: height * 0.02,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  Image: {
    width: width * 1,
    height: height * 0.2,
    resizeMode: 'contain',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  FavProdcut: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#BDBDBD',
  },
  FavText: {
    fontSize: 18,
    fontFamily: InterFont.SemiBoldFont,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  productInfoContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  productName: {
    fontSize: 18,
    fontFamily: InterFont.RegularFont,
  },
  productWeight: {
    fontSize: 14,
    fontFamily: InterFont.RegularFont,
    color: '#8B8B8B',
    textAlign: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    marginTop: 15,
  },
});

export default WishlistScreen;
