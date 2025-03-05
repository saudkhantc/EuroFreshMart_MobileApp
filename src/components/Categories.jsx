// import React from 'react';
// import {
//   View,
//   Image,
//   StyleSheet,
//   Dimensions,
//   Text,
//   TouchableOpacity,
//   FlatList,
// } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import img1 from '../assets/images/vegetables.png';
// import img2 from '../assets/images/apples.png';
// import img3 from '../assets/images/Meat.png';
// import img4 from '../assets/images/Drinks.png';
// import img5 from '../assets/images/Bakery.png';
// import {InterFont, textcolor} from '../styles/CustomStyles';
// import { useNavigation } from '@react-navigation/native';

// const {width, height} = Dimensions.get('window');

// const categoryData = [
//   {id: '1', name: 'Vegetables', image: img1},
//   {id: '2', name: 'Fruits', image: img2},
//   {id: '3', name: 'Meat', image: img3},
//   {id: '4', name: 'Drinks', image: img4},
//   {id: '5', name: 'Bakey', image: img5},
//   {id: '6', name: 'Bakey', image: img5},
//   {id: '7', name: 'Bakey', image: img5},
// ];

// const Categories = () => {
//  const navigation=useNavigation();
//   const renderItem = ({item}) => (
//     <View style={styles.main}>
//       <View style={styles.box}>
//         <Image source={item.image} />
//       </View>
//       <Text style={styles.text}>{item.name}</Text>
//     </View>
//   );
  
//   return (
//     <View style={styles.container}>
//       <View
//         style={{
//           justifyContent: 'space-between',
//           flexDirection: 'row',
//           alignItems: 'center',
//         }}>
//         <Text style={{fontSize: 18, fontFamily: InterFont.SemiBoldFont}}>
//           Categories
//         </Text>
//         <View style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
//           <TouchableOpacity onPress={() => navigation.navigate('category-screen')}>
//             <Text
//               style={{
//                 fontSize: 14,
//                 fontFamily: InterFont.SemiBoldFont,
//                 color: textcolor.color3,
//               }}>
//               See more
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <MaterialCommunityIcons
//               name="greater-than"
//               size={16}
//               color={textcolor.color3}
//             />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <FlatList
//         data={categoryData}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={{marginTop: 8}}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   main: {
//     alignItems: 'center',
//     marginHorizontal: 6,
//   },
//   box: {
//     backgroundColor: '#EEF9D8',
//     width: width * 0.15,
//     height: height * 0.08,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 15,
//   },
//   text: {
//     marginTop: 4,
//     textAlign: 'center',
//     fontFamily: InterFont.RegularFont,
//   },
// });

// export default Categories;

// src/components/Categories.js
// 
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { InterFont, textcolor } from "../styles/CustomStyles";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, setSelectedCategory } from "../redux/categorySlice";
import CustomCard from "./Productlist";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const Categories = () => {
  const dispatch = useDispatch();
  const navigation=useNavigation();
  const { items: categories, loading, error } = useSelector(
    (state) => state.categories
  );
  const flatListRef = useRef(null); //  Create a ref for FlatList  / 3 show a selected category in flatlist form C.S
  const { selectedCategory } = useSelector((state) => state.categories);        // use for category select 2
const handleCategoryClick = (category) => {                       // 2
  dispatch(setSelectedCategory(category)); // Update globally
};

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  useEffect(() => {
    if (categories.length > 0  && !selectedCategory) {      // && s.c  ///3
      dispatch(setSelectedCategory(categories[0])); //  Set first category as defaul
    }
  }, [categories,setSelectedCategory,dispatch]);
                                                  // 3 . Scroll to selected category
 useEffect(() => {
  if (selectedCategory && flatListRef.current) {
    const selectedIndex = categories.findIndex((item) => item._id === selectedCategory._id);
    if (selectedIndex !== -1) {
      flatListRef.current.scrollToIndex({ index: selectedIndex, animated: true });
    }
  }
}, [selectedCategory]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleCategoryClick(item)} style={styles.main}>
      <View style={styles.box}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
      <Text style={{
          color: item === selectedCategory ? '#ACE03A' : textcolor.color1, 
        }}>
        {item.name.length > 18 ? item.name.slice(0, 18) + ".." : item.name}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#ACE03A" />;
  }

  if (error) {
    return (
      <View>
        <Text style={{ color: "red" }}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
        <View style={styles.seeMoreContainer}>
          <TouchableOpacity onPress={()=>navigation.navigate('category-screen')}>
            <Text style={styles.seeMoreText}>See more</Text>
          </TouchableOpacity>
          <MaterialCommunityIcons name="greater-than" size={16} color={textcolor.color3} />
        </View>
      </View>

      <FlatList
        ref={flatListRef}              // 3
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 8 }}
      />

      {/* Show CustomCard only when a category is selected */}
      {selectedCategory && (
        <View style={{marginVertical:14,marginBottom:height*0.08}}>
          <CustomCard category={selectedCategory} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontFamily: InterFont.SemiBoldFont,
  },
  seeMoreContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  seeMoreText: {
    fontSize: 14,
    fontFamily: InterFont.SemiBoldFont,
    color: textcolor.color3,
  },
  main: {
    alignItems: "center",
    marginHorizontal: 6,
  },
  box: {
   // backgroundColor: "red",
    width: width * 0.15,
    height: height * 0.08,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: 'contain',
    borderRadius: 10,
  },
  text: {
    marginTop: 4,
    textAlign: "center",
    fontFamily: InterFont.RegularFont,
  },
});

export default Categories;
