import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import img1 from '../assets/images/vegetables.png';
import img2 from '../assets/images/apples.png';
import img3 from '../assets/images/Meat.png';
import img4 from '../assets/images/Drinks.png';
import img5 from '../assets/images/Bakery.png';
import {InterFont, textcolor} from '../styles/CustomStyles';

const {width, height} = Dimensions.get('window');

const categoryData = [
  {id: '1', name: 'Vegetables', image: img1},
  {id: '2', name: 'Fruits', image: img2},
  {id: '3', name: 'Meat', image: img3},
  {id: '4', name: 'Drinks', image: img4},
  {id: '5', name: 'Bakey', image: img5},
  {id: '6', name: 'Bakey', image: img5},
  {id: '7', name: 'Bakey', image: img5},
];

const Categories = () => {
  const renderItem = ({item}) => (
    <View style={styles.main}>
      <View style={styles.box}>
        <Image source={item.image} />
      </View>
      <Text style={styles.text}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 18, fontFamily: InterFont.SemiBoldFont}}>
          Categories
        </Text>
        <View style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
          <TouchableOpacity>
            <Text
              style={{
                fontSize: 14,
                fontFamily: InterFont.SemiBoldFont,
                color: textcolor.color3,
              }}>
              See more
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="greater-than"
              size={16}
              color={textcolor.color3}
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={categoryData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{marginTop: 8}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    alignItems: 'center',
    marginHorizontal: 6,
  },
  box: {
    backgroundColor: '#EEF9D8',
    width: width * 0.15,
    height: height * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  text: {
    marginTop: 4,
    textAlign: 'center',
    fontFamily: InterFont.RegularFont,
  },
});

export default Categories;
