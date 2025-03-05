import React, { useEffect, useState } from "react";
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
import { fetchCategories, setSelectedCategory } from "../../redux/categorySlice";
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

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [selectedCategory, setSelectedCategoryState] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    // Filter categories based on the search query or if a category is selected
    if (searchQuery) {
      setFilteredCategories(
        categories.filter((category) =>
          category.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      // Show all categories when the search query is empty, or show only the selected category
      if (selectedCategory) {
        setFilteredCategories([selectedCategory]);
      } else {
        setFilteredCategories(categories);
      }
    }
  }, [searchQuery, categories, selectedCategory]);

  if (loading) {
    return <ActivityIndicator size="large" color="#ACE03A" />;
  }

  if (error) {
    return <Text style={{ color: "red", textAlign: "center" }}>Error: {error}</Text>;
  }

  const handleCategoryClick = (category) => {
    setSelectedCategoryState(category);
    dispatch(setSelectedCategory(category));
    navigation.navigate("homepage");
  };

  const handleCategorySelectFromSearch = (category) => {
    setSelectedCategoryState(category);
  };

  // Function to reset search and show all categories
  const handleShowAllCategories = () => {
    setSearchQuery(""); // Clear the search query
    setSelectedCategoryState(null); // Deselect the selected category
  };

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
              <CustomSearchInput 
                placeholder={"Search for Fruit, Groce ..."} 
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategorySelectFromSearch}
                onSearchQueryChange={setSearchQuery} // Pass the setter for search query
              />
            </View>
          </ImageBackground>
        </View>

        <View style={styles.body}>
        <View style={{flexDirection:'row',justifyContent:"space-between"}}> 
           <Text style={styles.categorytitle}>Category</Text>
           <TouchableOpacity style={styles.showAllButton} onPress={handleShowAllCategories}>
             <Text style={styles.showAllText}>Show All</Text>
                  </TouchableOpacity>
           </View>

          <View style={styles.categoriesContainer}>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((item) => (
                <TouchableOpacity
                  key={item._id}
                  style={[
                    styles.categoryCard,
                    item._id === selectedCategory?._id && styles.selectedCategory,
                  ]}
                  onPress={() => handleCategoryClick(item)}
                >
                  <Image source={{ uri: item.image }} style={styles.categoryImage} />
                  <Text
                    style={[
                      styles.categoryName,
                      item._id === selectedCategory?._id && styles.selectedCategoryText,
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={{ textAlign: "center", marginTop: 20 }}>No categories found</Text>
            )}
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
    // overflow: 'hidden',
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
    marginTop: 10,
  },
  body: {
    marginHorizontal: 18,
  },
  categorytitle: {
    fontSize: 18,
    color: textcolor.color1,
    fontFamily: InterFont.BoldFont,
  },
 
  showAllText: {
    color: '#ACE03A',
    fontSize: 16,
    fontFamily: InterFont.MediumFont,
    alignSelf:'center',
    marginTop:10
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
  selectedCategoryText: {
    color: '#ACE03A', // Highlight selected category
  },
});
