import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import img1 from '../../assets/images/productDetail.jpeg';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {InterFont, textcolor} from '../../styles/CustomStyles';
import CustomButton from '../../components/CustomButton';

const {width, height} = Dimensions.get('window');

const ProductDetails = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={img1} style={styles.Image} />

          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleBackPress}>
              <AntDesign
                name="arrowleft"
                size={30}
                color="#fff"
                style={styles.icon}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <FontAwesome
                name="shopping-cart"
                size={30}
                color="#fff"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

         
        </View>

        <View style={styles.ProductDetails}>
            <View style={styles.TextContainer}>
              <View>
                <Text
                  style={{
                    fontSize: 24,
                    fontFamily: InterFont.SemiBoldFont,
                    color: textcolor.color2,
                  }}>
                  Fresh Carrot
                </Text>
              </View>

              <View
                style={{flexDirection: 'row', gap: 6, alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: InterFont.SemiBoldFont,
                    color: textcolor.color3,
                  }}>
                  $ 18,000
                </Text>
                <Text
                  style={{
                    fontFamily: InterFont.RegularFont,
                    color: '#828282',
                    fontSize: 12,
                  }}>
                  /kg
                </Text>
              </View>
            </View>

            <View style={{marginTop: height * 0.01}}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: InterFont.SemiBoldFont,
                  color: textcolor.color2,
                  textAlign: 'center',
                }}>
                Details
              </Text>
            </View>

            <View style={{marginTop:height*0.02}}>
              <Text style={styles.DescText}>Description</Text>
              <Text style={styles.DescDetails}>
                The carrot is a root vegetable, most commonly observed as orange
                in color, though purple, black, red, white, and yellow cultivars
                exist, all of which are domesticated forms of the wild carrot,
                Daucus carota, native to Europe and Southwestern Asia.
              </Text>
            </View>
            <View style={{marginTop:height*0.01}}>
              <Text style={styles.DescText}>Origin</Text>
              <Text style={styles.DescDetails}>
                The carrot is a root vegetable, most commonly observed as orange
                in color, though purple, black, red, white, and yellow cultivars
                exist, all of which are domesticated forms of the wild carrot,
                Daucus carota, native to Europe and Southwestern Asia.
              </Text>
            </View>
          </View>


          
      </ScrollView>

      <View style={styles.footer}>
          <View style={{flexDirection:"row",gap:10,alignItems:"center"}}>
          <TouchableOpacity style={{borderWidth:1,borderColor:"#ACE03A",borderRadius:5,padding:2}}>
            <AntDesign name="minus" color="#ACE03A" size={20}/>
          </TouchableOpacity>


          <TouchableOpacity style={{borderWidth:1,borderColor:"#ACE03A",borderRadius:5,padding:2,width:width*0.12,height:height*0.055,justifyContent:"center",backgroundColor:textcolor.color3}}>
            <Text style={{fontSize:18,fontFamily:InterFont.SemiBoldFont,textAlign:"center"}}>2</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{borderWidth:1,borderColor:"#ACE03A",borderRadius:5,padding:2}}>
            <AntDesign name="plus" color="#ACE03A" size={20}/>
          </TouchableOpacity>

          </View>

          <View>
          <CustomButton
                bgColor={textcolor.color3}
                text="Add to cart"
                width={width * 0.4}
                onPress={() => navigation.navigate('bottom-tabs')}
                paddingVertical={12}
                textColor={textcolor.color4}
                fontFamily={InterFont.SemiBoldFont}
                fontSize={18}
              />

          </View>


          </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow:1
  },
  imageContainer: {
    position: 'relative',
  },
  Image: {
    width: '100%',
    height: height * 0.4,
  },
  iconContainer: {
    position: 'absolute',
    top: height * 0.02,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  icon: {},
  ProductDetails: {
    paddingHorizontal: 20,

  },
  TextContainer: {
    paddingVertical: 10,
    gap: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#BDBDBD',
  },
  DescText: {
    fontSize: 16,
    fontFamily: InterFont.SemiBoldFont,
    color: '#7A53B9',
  },
  DescDetails: {
    fontSize: 13,
    fontFamily: InterFont.RegularFont,
    color: '#828282',
  },
  footer:{
    flexDirection:"row",
    justifyContent:"space-around",
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    backgroundColor: '#fff',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: -2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 4, 
    elevation: 5, 

  }
});

export default ProductDetails;
