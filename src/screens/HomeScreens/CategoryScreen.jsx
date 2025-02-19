import React, { useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { fetchCategories } from "../../redux/categorySlice";
import CustomSearchInput from '../../components/Custom_SearchInput';
import { InterFont, textcolor } from '../../styles/CustomStyles';
import CustomCartIcon from './CustomCartIcon';

const { width, height } = Dimensions.get('window');

const CategoryScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { items: categories, loading, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return <ActivityIndicator size="large" color="#ACE03A" />;
  }

  if (error) {
    return <Text style={{ color: "red", textAlign: "center" }}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollview}>
        <View style={styles.headerContainer}>
          <ImageBackground
            source={require('../../assets/images/Header.png')}
            style={styles.headerImage}
          >
            <View style={styles.iconContainer}>
              <CustomCartIcon />
            </View>
            <View style={styles.searchInputContainer}>
              <CustomSearchInput placeholder={"Search for Fruit, Groce ..."} />
            </View>
          </ImageBackground>
        </View>

        <View style={styles.body}>
          <Text style={styles.categorytitle}>Category</Text>

          <View style={styles.categoriesContainer}>
            {categories.map((item) => (
              <TouchableOpacity key={item._id} style={styles.categoryCard}>
                <Image source={{ uri: item.image }} style={styles.categoryImage} />
                <Text style={styles.categoryName}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    flexGrow: 1,
  },
  headerContainer: {
    width: '100%',
    height: height * 0.23,
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  iconContainer: {
    flexDirection: 'row', 
    padding: width * 0.04, 
  },
  searchInputContainer: {
    alignSelf: 'center',
    width: width * 0.8, 
    marginTop: 10
  },
  body: {
    marginHorizontal: 18,
  },
  categorytitle: {
    fontSize: 18,
    color: textcolor.color1,
    fontFamily: InterFont.BoldFont,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: height * 0.08
  },
  categoryCard: {
    width: width * 0.4,
    height: height * 0.26,
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2, 
  },
  categoryImage: {
    width: '70%',
    height: '50%',
    resizeMode: 'contain',
    alignSelf:'center',
    marginTop:8
  },
  categoryName: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 14,
    color: textcolor.color1,
    fontFamily: InterFont.SemiBoldFont,
  },
});



// import React, { useEffect } from "react";
// import {
//   View,
//   FlatList,
//   Image,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
//   TouchableOpacity,
// } from "react-native";
// import { useDispatch, useSelector } from "react-redux";

// import { useNavigation } from "@react-navigation/native";
// import { fetchCategories } from "../../redux/categorySlice";

// const CategoryScreen = () => {
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const { items: categories, loading, error } = useSelector(
//     (state) => state.categories
//   );

//   useEffect(() => {
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   const renderItem = ({ item }) => (
//     <View style={styles.item}>
//       <Image source={{ uri: item.image }} style={styles.image} />
//       <Text style={styles.text}>{item.name}</Text>
//     </View>
//   );

//   if (loading) {
//     return <ActivityIndicator size="large" color="#ACE03A" />;
//   }

//   if (error) {
//     return <Text style={{ color: "red", textAlign: "center" }}>Error: {error}</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//         <Text style={styles.backText}>← Back</Text>
//       </TouchableOpacity>
//       <FlatList
//         data={categories}
//         renderItem={renderItem}
//         keyExtractor={(item) => item._id}
//         numColumns={2} // Display in grid format
//         contentContainerStyle={{ paddingBottom: 20 }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   backButton: {
//     padding: 10,
//     backgroundColor: "#ACE03A",
//     alignSelf: "flex-start",
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   backText: {
//     fontSize: 16,
//     color: "#fff",
//   },
//   item: {
//     flex: 1,
//     alignItems: "center",
//     margin: 8,
//     backgroundColor: "#EEF9D8",
//     padding: 10,
//     borderRadius: 10,
//   },
//   image: {
//     width: 100,
//     height: 100,
//     borderRadius: 10,
//   },
//   text: {
//     marginTop: 5,
//     textAlign: "center",
//     fontWeight: "bold",
//   },
// });

// export default CategoryScreen;
